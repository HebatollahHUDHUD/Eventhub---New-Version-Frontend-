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

export interface AttachmentType {
  id: number;
  file_name: string;
  file_path: string;
}

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
export type TalentCategory = "talents" | "recruitment";

// Talent related interfaces
export interface Talent extends User {
  // Talent-specific fields are already in User interface
  // This extends User to make it clear this is a talent type
}

export interface TalentCardData {
  id: string;
  name: string;
  role: string;
  projects: number;
  years: number;
  skills: number;
  image: string;
}

export interface TalentsResponse {
  users: {
    data: Talent[];
    pagination: Pagination;
  };
}

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
  title: { en: string };
  about: { en: string };
  experience_years: number;
  gender: string | null;
  status: string | null;
  skills: JobAdSkill[];
  attachments: AttachmentType[];
  created_at: string;
  updated_at: string;
}

// Main website JobAd - title and about as strings
export interface JobAdMain {
  id: number;
  user: JobAdUser;
  country: JobAdCountry;
  title: string;
  about: string;
  experience_years: number;
  gender: string | null;
  status: string | null;
  skills: JobAdSkill[];
  attachments: AttachmentType[];
  created_at: string;
  updated_at: string;
}

export interface JobAdsResponse {
  job_ads: {
    data: JobAd[];
    pagination: Pagination;
  };
}

export interface JobAdsMainResponse {
  job_ads: {
    data: JobAdMain[];
    pagination: Pagination;
  };
}

export type JobAdDetailsResponse = {
  job_ad: JobAd;
};

export type JobAdMainDetailsResponse = {
  job_ad: JobAdMain;
  similar_job_ads: JobAdMain[];
};

// Event related interfaces
export interface EventType {
  id: number;
  name: string;
  slug: string;
}

export interface Event {
  id: number;
  event_type: EventType;
  title: string;
  from_date: string;
  to_date: string;
  check_in_time: string;
  check_out_time: string;
  lat: string;
  lng: string;
  status: string;
  attendees: any[];
  users: User[];
  attachments: AttachmentType[];
  created_at: string;
  updated_at: string;
}

export interface EventsResponse {
  events?: Event[];
  result?: {
    events?: Event[];
  };
}

export type EventDetailsResponse = {
  event: Event;
};
