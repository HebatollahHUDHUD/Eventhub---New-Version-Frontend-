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

export interface InfoResponse {
  mobile: string;
  email: string;
  address: string;
  map_url: string;
}
export type TalentCategory = 
  | "talents" 
  | "recruitment";


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

// Pricing Plans related interfaces
export interface Plan {
  id: number;
  type: string;
  image: string | null;
  name: string;
  slug: string;
  features: string[];
  currency: string;
  price: string;
  billing_interval: string;
  is_featured: number;
}

export interface PricingPageResponse {
  pricing_page_title: string;
  pricing_page_subtitle: string;
  plans: Plan[];
}

export interface ProfilePlanResponse {
  current_subscription: Plan | null;
  other_plans: Plan[];
}

export interface CurrentSubscriptionWithDate extends Plan {
  end_date?: string | null;
}

// Talent Profile related interfaces
export interface Position {
  id: number;
  name: string;
  slug: string;
}

export interface Education {
  id: number;
  major: string;
  university: string;
  from_date: string;
  to_date: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company_id?: number | null;
  position_id?: number | null;
  other_company?: string | null;
  other_position?: string | null;
  company?: {
    id: number;
    name: string;
  } | null;
  position?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  from_date: string;
  to_date: string | null;
  is_current: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  slug: string;
}

export interface Language {
  id: number;
  name: string;
  slug: string;
}

export interface Badge {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
}

export interface Subscription {
  id: number;
  plan_id: number;
  plan_name: string;
  status: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: Record<string, string> | string;
  description: Record<string, string> | string;
  date: string;
  attachments: AttachmentType[];
  created_at: string;
  updated_at: string;
}

export interface TalentProfile {
  id: number;
  name: string;
  photo: string | null;
  email: string;
  user_type: "talent";
  mobile: string | null;
  role: string | null;
  gender: string | null;
  bio: string | null;
  position: Position | null;
  other_position: string | null;
  experience_years: number | null;
  available_for_work: boolean;
  price_per_project: boolean | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  skills: Skill[];
  languages: Language[];
  badges: Badge[];
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  current_subscription: Subscription | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export type TalentProfileResponse = {
  profile: TalentProfile;
};

export type ProjectDetailsResponse = {
  project: Project;
};

// Course related interfaces
export interface Lesson {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  video_url: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  is_active: number;
  lessons: Lesson[];
  created_at: string;
  updated_at: string;
}

export interface CoursesResponse {
  courses: {
    data: Course[];
    pagination: Pagination;
  };
}

export type CourseDetailsResponse = {
  course: Course;
};

// Book related interfaces
export interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  file_url?: string;
}

export interface BooksResponse {
  books: {
    data: Book[];
    pagination: Pagination;
  };
}

export type BookDetailsResponse = {
  book: Book;
};

// Employee related interfaces
export interface Employee {
  id: number;
  user: User;
  position: Position;
  other_position: string | null;
  other_company: string | null;
  is_current: number;
  company_verification_status: "pending" | "approved" | "rejected";
  description: string;
  from_date: string;
  to_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployeesResponse {
  employees: Employee[];
}


export type EmployeeDetailsResponse = {
  employee: Employee;
};
