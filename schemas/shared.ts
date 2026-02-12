import { email, z } from "zod";

export const timestamp = z.string().datetime(); // ISO 8601 timestamp

export const linkSchema = z
  .string()
  .min(1)
  .regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/, {
    message: "Website URL is invalid",
  });

export const PaginationSchema = z.object({
  total: z.number(),
  count: z.number(),
  per_page: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
});

export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  country: ItemSchema,
});

export const StateSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: CitySchema,
});

const AboutItemSchema = z
  .object({
    title: z.string().min(1),
    desc: z.string().min(1),
    icon: z.string(),
  })
  .strict();

const SummaryItemSchema = z
  .object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
  })
  .strict();

const WhyUsItemSchema = z
  .object({
    title: z.string().min(1),
    desc: z.string().min(1),
  })
  .strict();

const CalendarItemSchema = z
  .object({
    title: z.string().min(1),
    desc: z.string().min(1),
  })
  .strict();

const FaqSchema = z
  .object({
    id: z.number().int().nonnegative(),
    question: z.string().min(1),
    answer: z.string().min(1),
  })
  .strict();

export const AcademicTrack = z
  .object({
    id: z.number().int().positive(),
    image: z.string().url(),
    name: z.string().min(1),
    description: z.string().min(1),
    duration_years: z.number().int().positive(),
    total_semesters: z.number().int().positive(),
    weekly_meetings: z.number().int().positive(),
    age_requirement_min: z.number().int().nonnegative(),
    age_requirement_max: z.number().int().positive(),
    registration_fee: z.number().int().positive(),
    memorized_parts_required: z.number().int().min(0).max(30),
    tajweed_certificate_required: z.union([z.literal(0), z.literal(1)]),
  })
  .strict()
  .refine((v) => v.age_requirement_min <= v.age_requirement_max, {
    message: "Min age must be less than or equal to max age",
  });

export const CollegeLevelSchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

export const College = z
  .object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    description: z.string().min(1),
    level: CollegeLevelSchema,
    age: z.string().min(1),
    requirements: z.string().min(1),
    image: z.string().url(),
    academic_tracks_count: z.number().int().positive(),
    academic_tracks: z.array(AcademicTrack).min(1),
  })
  .strict();

const CourseSchema = z.object({
  id: z.number().int().positive(),
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  learning_outcomes: z.string().min(1),
  teaching_methods: z.string().min(1),
  credit_hours: z.number().int().positive(),
  course_type: z.enum(["academic", "extracurricular"]),
  is_active: z.union([z.literal(0), z.literal(1)]),
  created_at: timestamp,
  updated_at: timestamp,
});

const CoursesSchema = z.array(CourseSchema).min(1); // ;

export const ReviewSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    role: z.string().min(1),
    location: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    review: z.string().min(1),
  })
  .strict();

const FAQs = z.array(FaqSchema).min(1);
const Colleges = z.array(College).min(1);
const AcademicTracks = z.array(AcademicTrack).min(1);

/* ---------- Root schema ---------- */

export const HomeSchema = z
  .object({
    home_hero_title: z.string().min(1),
    home_hero_subtitle: z.string().min(1),
    home_hero_desc: z.string().min(1),
    home_hero_btn_1_text: z.string().min(1),
    home_hero_btn_2_text: z.string().min(1),

    home_about_title: z.string().min(1),
    home_about_desc: z.string().min(1),
    home_about_video: z.string().url().endsWith(".mp4"),

    home_tracks_title: z.string().min(1),
    home_tracks_desc: z.string().min(1),

    home_why_us_title: z.string().min(1),
    home_why_us_desc: z.string().min(1),

    home_calendar_title: z.string().min(1),
    home_calendar_desc: z.string().min(1),

    home_reviews_title: z.string().min(1),
    home_reviews_desc: z.string().min(1),

    home_faq_title: z.string().min(1),
    home_faq_desc: z.string().min(1),

    home_footer_title: z.string().min(1),
    home_footer_desc: z.string().min(1),

    home_academic_colleges_title: z.string().min(1),
    home_academic_colleges_desc: z.string().min(1),

    home_about_items: z.array(AboutItemSchema).min(1),
    home_summary_items: z.array(SummaryItemSchema).min(1),
    home_why_us_items: z.array(WhyUsItemSchema).min(1),
    home_calendar_items: z.array(CalendarItemSchema).min(1),

    faqs: z.array(FaqSchema).min(1),

    academic_tracks: AcademicTracks,

    colleges: Colleges,

    reviews: z.array(ReviewSchema).min(1),
  })
  .strict();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  kep_login: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    applicant_type: z.enum(["student", "teacher", "memorization_teacher"]),
    email: z.string().email(),
    full_name: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    gender: z.enum(["male", "female"]),
    country: z.string().min(2, {
      message: "Country must be at least 2 characters.",
    }),
    date_of_birth: z.string(),
    qualification: z.string().min(1, {
      message: "Qualification is required.",
    }),
    experience_years: z
      .string()
      .regex(/^\d+$/, {
        message: "Experience years must be a number.",
      })
      .optional(),
    level: z.string().optional(),
    college_id: z.number().int().positive().optional(),
    academic_track_id: z.number().int().positive().optional(),
    cv: z.instanceof(File).optional(),
    recitation_id: z.number().int().positive().optional(),
    memorized_15_juz: z.string().optional(),
    taught_under_13: z.enum(["0", "1"]).optional(),
    accept_terms: z.enum(["1"]).optional(),
    tajweed_certificates: z.array(z.instanceof(File)).optional(),
    memorized_parts: z.coerce
      .number({
        message:
          "Memorized parts must be a number between 1 and 30.",
      })
      .min(1, { message: "Must be at least 1." })
      .max(30, { message: "Must be at most 30." })
      .optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.applicant_type === "student") {
      if (!data.level) {
        ctx.addIssue({
          code: "custom",
          message: "Please add a level.",
        });
      }
      if (!data.academic_track_id) {
        ctx.addIssue({
          code: "custom",
          message: "Please select an academic track.",
        });
      }
      if (!data.college_id) {
        ctx.addIssue({
          code: "custom",
          message: "Please select an college.",
        });
      }
      if (!data.accept_terms) {
        ctx.addIssue({
          code: "custom",
          message: "Please accept the terms and conditions.",
        });
      }
    } else if (data.applicant_type === "memorization_teacher") {
      if (!data.tajweed_certificates?.length) {
        ctx.addIssue({
          code: "custom",
          message: "Please upload at least one Tajweed certificate.",
        });
      }

      if (!data.recitation_id) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a recitation.",
        });
      }
    } else if (data.applicant_type === "teacher") {
      if (!data.cv) {
        ctx.addIssue({
          code: "custom",
          message: "Please upload a CV.",
        });
      }

      if (!data.experience_years) {
        ctx.addIssue({
          code: "custom",
          message: "Please add your experience years.",
        });

        if (!data.accept_terms) {
          ctx.addIssue({
            code: "custom",
            message: "Please accept the terms and conditions.",
          });
        }
      }
    }
  });

const infoSchema = z.object({
  footer_title: z.string().min(1),
  footer_desc: z.string().min(1),

  social_media_facebook_url: z.string(),
  social_media_instagram_url: z.string(),
  social_media_x_url: z.string(),
  website_desc: z.string(),
  website_favicon: z.string(),
  website_logo: z.string(),
  website_name: z.string(),
  visitor_country: z.string(),
});

export const AnnouncementSchema = z
  .object({
    id: z.number().int().positive(),
    image: z.string().url(),
    title: z.string().min(1),
    content: z.string().min(1),
    announcement_type: z.enum(["news", "event", "reminder"]).default("news"),
    event_date: z.string().datetime().nullable(),
    target_audience: z
      .enum(["all", "students", "teachers", "staff"])
      .default("all"),
    target_track_id: z.number().int().nullable(),
    target_class_id: z.number().int().nullable(),
    priority: z.enum(["low", "normal", "high"]).default("normal"),
    is_published: z
      .union([z.boolean(), z.number().int().min(0).max(1)])
      .transform((v) => (typeof v === "number" ? v === 1 : v)),
    published_at: z.string().datetime().nullable(),
    expires_at: z.string().datetime().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  })
  .strict();

const AnnouncementsSchema = z.array(AnnouncementSchema);

export const CollegePageSchema = z.object({
  colleges_page_title: z.string().min(1),
  colleges_page_subtitle: z.string().min(1),
  colleges_page_desc: z.string().min(1),
  colleges_page_image: z.string().url(),
  colleges: Colleges,
  stats: z.object({
    academic_tracks_count: z.number(),
    colleges_count: z.number(),
    teachers_count: z.number(),
    weekly_classes_count: z.number(),
  }),
});

export const JoinPageSchema = z.object({
  join_page_title: z.string().min(1),
  join_page_desc: z.string().min(1),
  join_page_image: z.string().url(),
});

const AboutPageSchema = z.object({
  about_page_title: z.string(),
  about_page_subtitle: z.string(),
  about_page_video: z.string(),

  about_page_goals_title: z.string(),
  about_page_goals_items: z
    .array(AboutItemSchema)
    .nullable()
    .optional()
    .default([]),

  about_page_tools_title: z.string(),
  about_page_tools_items: z
    .array(AboutItemSchema)
    .nullable()
    .optional()
    .default([]),

  about_page_what_offer_title: z.string(),
  about_page_what_offer_desc: z.string(),
  about_page_what_offer_items: z
    .array(AboutItemSchema)
    .nullable()
    .optional()
    .default([]),

  about_page_footer_title: z.string(),
  about_page_footer_desc: z.string(),
  about_page_footer_btn_text: z.string(),
  about_page_footer_btn_url: z.string(),
});

export const faqContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  topic: z.string().min(1),
  message: z.string().min(1),
});

const trackPageSchema = z.object({
  academicTrack: z
    .object({
      college: College,
    })
    .and(AcademicTrack),
  courses: CoursesSchema,
});

const calendarSchema = z.object({
  calendar_page_title: z.string().min(1),
  calendar_page_desc: z.string().min(1),
  calendar_page_image: z.string().url(),
  announcements: AnnouncementsSchema,
});

export const ContactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string()
})

export type Calendar = z.infer<typeof calendarSchema>;
export type AnnouncementSchema = z.infer<typeof AnnouncementSchema>;
export type AnnouncementsSchema = z.infer<typeof AnnouncementsSchema>;
export type HomeSchema = z.infer<typeof HomeSchema>;
export type FAQsSchema = z.infer<typeof FAQs>;
export type CollegesSchema = z.infer<typeof Colleges>;
export type CollegeSchema = z.infer<typeof College>;
export type TrackSchema = z.infer<typeof AcademicTrack>;
export type AcademicTracksSchema = z.infer<typeof AcademicTracks>;
export type CoursesSchema = z.infer<typeof CoursesSchema>;
export type CourseSchema = z.infer<typeof CourseSchema>;
export type InfoSchema = z.infer<typeof infoSchema>;
export type CollegePage = z.infer<typeof CollegePageSchema>;
export type AboutPage = z.infer<typeof AboutPageSchema>;
export type TrackPage = z.infer<typeof trackPageSchema>;
export type JoinPage = z.infer<typeof JoinPageSchema>;
export type ContactFormType = z.infer<typeof ContactFormSchema>;
