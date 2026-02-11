export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type RequestData = Record<string, unknown> | FormData | null;

export interface FetchInstanceConfig {
  baseURL?: string;
  headers?: Record<string, string>;
}

export interface NextCacheConfig {
  revalidate?: number | false;
  tags?: string[];
  cache?: RequestCache;
}

export interface FetchRequestConfig extends FetchInstanceConfig {
  method?: RequestMethod;
  body?: RequestData;
  queryParams?: Record<string, string>;
  responseType?:
    | "json"
    | "text"
    | "blob"
    | "arrayBuffer"
    | "formData"
    | "stream";
  next?: NextCacheConfig;
}

type SuccessResponse<T> = {
  status: "success";
  message: string;
  error_flag: boolean;
  result: T;
};

type FailResponse<K = unknown> = {
  status: "fail";
  code: number;
  message: string[];
  fail?: K;
  errors?: any;
};

// Union type for the possible response outcomes
type ApiResponse<T, K = unknown> = SuccessResponse<T> | FailResponse<K>;

export class FetchInstance {
  private baseURL?: string;
  private headers?: Record<string, string>;

  constructor(config?: FetchInstanceConfig) {
    this.baseURL = config?.baseURL;
    this.headers = config?.headers || {};
  }

  private buildURL(url: string, queryParams?: Record<string, string>): string {
    const params = new URLSearchParams(queryParams).toString();
    return params ? `${url}?${params}` : url;
  }

  public async request<T, K = unknown>(
    url: string,
    config: FetchRequestConfig = {}
  ): Promise<ApiResponse<T, K>> {
    const fullURL = this.baseURL ? `${this.baseURL}${url}` : url;
    const {
      method = "GET",
      body,
      queryParams,
      responseType = "json",
      headers: requestHeaders,
    } = config;

    const mergedHeaders = {
      ...this.headers, // Instance-level headers
      ...requestHeaders, // Request-specific headers (can override instance headers)
    };

    if (!(body instanceof FormData)) {
      mergedHeaders["Content-Type"] = "application/json";
    }

    try {
      // Build fetch options with Next.js cache support
      const fetchOptions: RequestInit & { next?: NextCacheConfig } = {
        method,
        headers: mergedHeaders,
        body: body instanceof FormData ? body : JSON.stringify(body),
      };

      // Add Next.js cache options if provided
      if (config.next) {
        const nextOptions: NextCacheConfig = {};
        if (config.next.revalidate !== undefined) {
          nextOptions.revalidate = config.next.revalidate;
        }
        if (config.next.tags) {
          nextOptions.tags = config.next.tags;
        }
        if (config.next.cache) {
          fetchOptions.cache = config.next.cache;
        }
        if (Object.keys(nextOptions).length > 0) {
          fetchOptions.next = nextOptions;
        }
      }

      const response = await fetch(this.buildURL(fullURL, queryParams), fetchOptions as RequestInit);

      const statusCode = response.status;

      if (!response.ok) {
        const { message, errors, fail } = await response.json();

        if (response.status >= 500) throw new Error("Server error");

        return {
          status: "fail",
          code: statusCode,
          message,
          errors: errors,
          fail,
        } as FailResponse<K>;
      }

      let responseData;
      switch (responseType) {
        case "json":
          responseData = await response.json();
          break;
        case "text":
          responseData = await response.text();
          break;
        case "blob":
          responseData = await response.blob();
          break;
        case "arrayBuffer":
          responseData = await response.arrayBuffer();
          break;
        case "formData":
          responseData = await response.formData();
          break;
        case "stream":
          responseData = response.body;
          break;
        default:
          responseData = null;
      }

      return {
        status: "success",
        ...responseData,
      } as SuccessResponse<T>;
    } catch (error) {
      let errorMessage = ["Something went wrong"];

      // Narrowing down the 'unknown' type
      if (error instanceof Error) {
        errorMessage = [error.message];
      } else {
        errorMessage = [error as string]; // Handle string-based errors (e.g., throw 'error' string)
      }

      return {
        status: "fail",
        code: 500,
        message: errorMessage,
        fail: undefined,
      } as FailResponse<K>;
    }
  }
}
