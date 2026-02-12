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


