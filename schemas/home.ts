import { Plan, BlogPostCategory, Talent } from "./types";

// Home page specific types
export interface HomeAboutUsItem {
  title: string;
}

export interface HomeOpportunity {
  id: number;
  title: string;
  about: string;
  experience_years: number;
  gender: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export interface HomeBlogPost {
  id: number;
  slug: string;
  image: string;
  title: string;
  content: string;
  category: BlogPostCategory;
  created_at: string;
}

export interface HomeFeaturedCompany {
  id: number;
  name: string;
  photo: string | null;
  incharge_person_name: string;
  email: string;
  user_type: string;
  mobile: string | null;
  role: string | null;
}

export interface HomeResponse {
  home_hero_title: string;
  home_hero_subtitle: string;
  home_hero_image: string | null;
  home_hero_image_2: string | null;
  home_about_us_title: string;
  home_about_us_desc: string;
  home_about_us_video: string | null;
  home_about_us_items: HomeAboutUsItem[];
  home_trusted_organizations_title: string;
  home_trusted_organizations_subtitle: string;
  home_trusted_organizations_items: unknown[] | null;
  home_talents_title: string;
  home_talents_subtitle: string;
  home_pricing_title: string;
  home_pricing_subtitle: string;
  home_pricing_desc: string;
  home_opportunities_title: string;
  home_opportunities_subtitle: string;
  home_opportunities_desc: string;
  home_blog_title: string;
  home_blog_subtitle: string;
  home_blog_desc: string;
  home_about_us_video_url: string;
  plans: Plan[];
  opportunities: HomeOpportunity[];
  blog_posts: HomeBlogPost[];
  featured_talents: Talent[];
  featured_companies: HomeFeaturedCompany[];
}
