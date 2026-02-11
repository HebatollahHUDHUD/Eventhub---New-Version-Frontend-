export interface BlogPost {
  id: number;
  title: string;
  image: string;
  created_at: string;
  updated_at?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
}

export interface BlogPostsResponse {
  blog_posts: {
    data: BlogPost[];
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
}

export type BlogCategory = 
  | "all" 
  | "business" 
  | "conference" 
  | "marketing" 
  | "sales" 
  | "organizing";


export type BlogPostDetailsResponse = {
  error_flag: number;
  message: string;
  result: {
    blog_post: {
      id: number;
      slug: string;
      title: string;
      content: string;
      category: string;
      created_at: string;
      image?: string | null;
    };
  };
};

export type TalentCategory = 
  | "talents" 
  | "recruitment";


