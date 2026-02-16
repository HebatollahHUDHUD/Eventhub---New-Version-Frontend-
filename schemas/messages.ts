import { AttachmentType } from "./types";

export interface MessageSender {
  id: number;
  name: string;
  photo: string | null;
  email?: string;
  user_type?: string;
}

export interface MessageType {
  id: number;
  sender: MessageSender;
  is_mine: number; // 0 or 1
  body: string | null;
  attachments: AttachmentType[];
  created_at: string;
  updated_at?: string;
}

export interface MessagesResponse {
  messages: {
    data: MessageType[];
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

export interface ConversationDetailsResponse {
  conversation: {
    id: number;
    subject: {
      id: number;
      job_ad: {
        id: number;
        user: {
          id: number;
          name: string;
          photo: string | null;
          email: string;
          user_type: string;
        };
        title: string;
        about: string;
        experience_years: number;
        gender: string | null;
        status: string | null;
        created_at: string;
        updated_at: string;
      } | null;
      user: {
        id: number;
        name: string;
        photo: string | null;
        email: string;
        user_type: string;
      } | null;
      created_at: string | null;
      updated_at: string | null;
    } | null;
    created_by: {
      id: number;
      name: string;
      photo: string | null;
      email: string;
      user_type: string;
    };
    users: Array<{
      id: number;
      name: string;
      photo: string | null;
      email: string;
      user_type: string;
    }>;
    unread_count: number;
    created_at: string;
    subject_type?: string;
    subject_id?: number;
    module?: {
      name: string;
    } | null;
  };
}
