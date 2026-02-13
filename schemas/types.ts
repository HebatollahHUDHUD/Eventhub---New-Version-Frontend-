import { ReactNode } from "react";


export type Pagination = {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
};

export type BlogCategory = 
  | "all" 
  | "business" 
  | "conference" 
  | "marketing" 
  | "sales" 
  | "organizing";

export interface BlogPostCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Opportunity {
  id: number;
  title: string;
  image: string;
  company_name: string;
  slug?: string;
  category?: string;
}

export type OpportunityCategory =
  | "all"
  | "asher"
  | "software engineer"
  | "marketing"
  | "photographer"
  | "organizing";

export interface User {
  id: number;
  name: string;
  photo: string | null;
  email: string;
  user_type: string;
  mobile: string | null;
  gender: string | null;
  address: string | null;
  bio: string | null;
  role: string | null;
  other_position: string | null;
  experience_years: number | null;
  available_for_work: boolean;
  price_per_project: boolean;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  last_login_at: string | null;
}


export interface BlogPost {
  id: number;
  slug: string;
  image: string;
  title: string;
  content: string;
  category: BlogPostCategory;
  writer: User;
  created_at: string;
}


export interface BlogPostsResponse {
  blog_posts: {
    data: BlogPost[];
    pagination: Pagination;
  };
}

export type BlogPostDetailsResponse = {
  blog_post: BlogPost;
};

export interface ContactItem {
  icon: ReactNode;
  title: string;
  value: string;
  href: string;
  isExternal?: boolean;
}
export type TalentCategory = 
  | "talents" 
  | "recruitment";





// Job Ad related interfaces
export interface JobAdCountry {
  id: number;
  name: string;
  slug: string;
}

export interface JobAdSkill {
  id: number;
  name: string;
  slug: string;
}

export interface JobAdUser extends User {
  incharge_person_name: string | null;
}

export interface JobAd {
  id: number;
  user: JobAdUser;
  country: JobAdCountry;
  title: Record<string, string>;
  about: Record<string, string>;
  experience_years: number;
  gender: string | null;
  status: string | null;
  skills: JobAdSkill[];
  created_at: string;
  updated_at: string;
}

export interface JobAdsResponse {
  job_ads: {
    data: JobAd[];
    pagination: Pagination;
  };
}

export type JobAdDetailsResponse = {
  job_ad: JobAd;
};
