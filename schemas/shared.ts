import { email, z } from "zod";
import { User } from "./types";
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
  identifier: z.string().min(1, {
    message: "Email or username is required.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  keep_login: z.boolean().optional(),
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

export const companyRegisterSchema = z
  .object({
    user_type: z.literal("company"),
    name: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    mobile: z.string().min(10, {
      message: "Mobile number must be at least 10 characters.",
    }),
    country_id: z.number().int().positive({
      message: "Please select a valid country.",
    }),
    incharge_person_name: z.string().min(2, {
      message: "Incharge person name must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    password_confirmation: z.string().min(8, {
      message: "Password confirmation must be at least 8 characters.",
    }),
    image: z.instanceof(File).optional(),
  })
  .strict()
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export const talentRegisterSchema = z
  .object({
    step:z.enum(["1", "2", "3"]),
    user_type: z.enum(["talent", "recruiter"]),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    mobile: z.string().min(10, {
      message: "Mobile number must be at least 10 characters.",
    }),
    country_id: z.number().int().positive({
      message: "Please select a valid country.",
    }),
    position_id: z.number().int().positive({
      message: "Please select a valid position.",
    }),
    language_ids: z.array(z.number().int().positive()).min(1, {
      message: "Please select at least one language.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    password_confirmation: z.string().min(8, {
      message: "Password confirmation must be at least 8 characters.",
    }),
    verification_code: z.string().min(6, {
      message: "Verification code must be at least 6 characters.",
    }).optional(),
    image: z.instanceof(File).optional(),
    skills: z.array(z.string()).optional(),
  })
  .strict()
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  })
  .refine((data) => data.step === "2" ? data.verification_code : true, {
    message: "Verification code is required.",
    path: ["verification_code"],
  })

export const companyProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
  country_id: z.number().int().positive({
    message: "Please select a valid country.",
  }),
  incharge_person_name: z.string().optional(),
  image: z.instanceof(File).optional(),
  language_ids: z.array(z.number().int().positive()).optional(),
});

export type CompanyProfileType = z.infer<typeof companyProfileSchema>;

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, {
      message: "Current password is required.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    password_confirmation: z.string().min(8, {
      message: "Password confirmation must be at least 8 characters.",
    }),
  })
  .strict()
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

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

const AboutFaqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const AboutPageSchema = z.object({
  about_page_title: z.string().nullable().optional(),
  about_page_subtitle: z.string().nullable().optional(),
  about_page_desc: z.string().nullable().optional(),
  about_page_video: z.string().nullable().optional(),

  about_page_why_us_items: z
    .array(WhyUsItemSchema)
    .nullable()
    .optional()
    .default([]),

  about_page_contract_title: z.string().nullable().optional(),
  about_page_contract_subtitle: z.string().nullable().optional(),
  about_page_contract_desc: z.string().nullable().optional(),
  about_page_contract_image: z.string().nullable().optional(),
  about_page_contract_file: z.string().nullable().optional(),

  about_page_faq_title: z.string().nullable().optional(),
  about_page_faq_subtitle: z.string().nullable().optional(),
  about_page_faq_items: z
    .array(AboutFaqItemSchema)
    .nullable()
    .optional()
    .default([]),
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
export type CompanyRegisterSchema = z.infer<typeof companyRegisterSchema>;
export type TalentRegisterSchema = z.infer<typeof talentRegisterSchema>;

// Dashboard schema - title and about as objects with en and ar
export const jobAdSchema = z
  .object({
    title: z.object({
      en: z.string().min(1),
      ar: z.string().min(1).optional(),
    }),
    about: z.object({
      en: z.string().min(1),
      ar: z.string().min(1).optional(),
    }),
    country_id: z.number().int().positive({
      message: "Please select a valid country.",
    }),
    gender: z.enum(["male", "female", "both"]).optional(),
    experience_years: z.string().regex(/^\d+$/, {
      message: "Experience years must be a number.",
    }),
    skill_ids: z.array(z.number().int().positive()).min(1),
    attachments: z.array(z.instanceof(File)).optional(),
  })
  .strict();

export type JobAdSchema = z.infer<typeof jobAdSchema>;

// Main website schema - title and about as strings
export const jobAdMainSchema = z
  .object({
    title: z.string().min(1),
    about: z.string().min(1),
    country_id: z.number().int().positive({
      message: "Please select a valid country.",
    }),
    gender: z.enum(["male", "female", "both"]).optional(),
    experience_years: z.string().regex(/^\d+$/, {
      message: "Experience years must be a number.",
    }),
    skill_ids: z.array(z.number().int().positive()).min(1),
    attachments: z.array(z.instanceof(File)).optional(),
  })
  .strict();

export type JobAdMainSchema = z.infer<typeof jobAdMainSchema>;

export const AddEventSchema = z
  .object({
    id: z.number().int().positive().optional(),
    title: z.object({
      en: z.string().min(1, {
        message: "Event title is required.",
      }),
    }),
    event_type_id: z.number().int().positive({
      message: "Please select a valid event type.",
    }),
    from_date: z.string().regex(/^\d{4}-\d{2}-\d{1,2}$/, {
      message: "From date must be in YYYY-MM-DD format.",
    }),
    to_date: z.string().regex(/^\d{4}-\d{2}-\d{1,2}$/, {
      message: "To date must be in YYYY-MM-DD format.",
    }),
    lat: z.number().min(1, {
      message: "Latitude is required.",
    }),
    lng: z.number().min(1, {
      message: "Longitude is required.",
    }),
    check_in_time: z.string().regex(/^\d{2}:\d{2}$/, {
      message: "Check-in time must be in HH:MM format.",
    }),
    check_out_time: z.string().regex(/^\d{2}:\d{2}$/, {
      message: "Check-out time must be in HH:MM format.",
    }),
    user_ids: z.array(z.number().int().positive()).min(1, {
      message: "At least one user must be selected.",
    }),
    users:z.array(z.any()).optional(),
    attachments: z.array(z.instanceof(File)).optional(),
  })
  .strict()
  .refine(
    (data) => {
      const fromDate = new Date(data.from_date);
      const toDate = new Date(data.to_date);
      return toDate >= fromDate;
    },
    {
      message: "To date must be after or equal to from date.",
      path: ["to_date"],
    }
  );

export type AddEventType = z.infer<typeof AddEventSchema>;

// Education Schema
export const EducationSchema = z
  .object({
    id: z.number().int().positive().optional(),
    major: z.string().min(1, {
      message: "Major is required.",
    }),
    university: z.string().min(1, {
      message: "University is required.",
    }),
    from_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "From date must be in YYYY-MM-DD format.",
    }),
    to_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "To date must be in YYYY-MM-DD format.",
    }),
  })
  .strict()
  .refine(
    (data) => {
      const fromDate = new Date(data.from_date);
      const toDate = new Date(data.to_date);
      return toDate >= fromDate;
    },
    {
      message: "To date must be after or equal to from date.",
      path: ["to_date"],
    }
  );

export type EducationType = z.infer<typeof EducationSchema>;

// Experience Schema
export const ExperienceSchema = z
  .object({
    id: z.number().int().positive().optional(),
    company_id: z.number().int().positive().optional(),
    position_id: z.number().int().positive().optional(),
    other_company: z.string().optional(),
    other_position: z.string().optional(),
    from_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "From date must be in YYYY-MM-DD format.",
    }),
    to_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "To date must be in YYYY-MM-DD format.",
    }),
    is_current: z.number().int().min(0).max(1),
    description: z.string().min(1, {
      message: "Description is required.",
    }),
  })
  .strict()
  .refine(
    (data) => {
      // Either company_id or other_company must be provided
      return !!(data.company_id || data.other_company);
    },
    {
      message: "Either company or other company must be provided.",
      path: ["company_id"],
    }
  )
  .refine(
    (data) => {
      // Either position_id or other_position must be provided
      return !!(data.position_id || data.other_position);
    },
    {
      message: "Either position or other position must be provided.",
      path: ["position_id"],
    }
  )
  .refine(
    (data) => {
      // If is_current is 1, to_date validation is skipped
      if (data.is_current === 1) {
        return true;
      }
      const fromDate = new Date(data.from_date);
      const toDate = new Date(data.to_date);
      return toDate >= fromDate;
    },
    {
      message: "To date must be after or equal to from date.",
      path: ["to_date"],
    }
  );

export type ExperienceType = z.infer<typeof ExperienceSchema>;

// Skills Form Schema
export const SkillsFormSchema = z
  .object({
    position_id: z.number().int().positive().optional(),
    language_ids: z.array(z.number().int().positive()).optional(),
    skill_ids: z.array(z.number().int().positive()).optional(),
    badge_ids: z.array(z.number().int().positive()).optional(),
    experience_years: z.number().int().min(0).optional(),
    bio: z.string().max(250, {
      message: "Bio must be at most 250 characters.",
    }).optional(),
    available_for_work: z.union([z.literal(0), z.literal(1)]).optional(),
    price_per_project: z.number().min(0).optional(),
    facebook_url: z.string().url().optional().or(z.literal("")),
    instagram_url: z.string().url().optional().or(z.literal("")),
    youtube_url: z.string().url().optional().or(z.literal("")),
    linkedin_url: z.string().url().optional().or(z.literal("")),
    resume: z.instanceof(File).optional(),
  })
  .strict();

export type SkillsFormType = z.infer<typeof SkillsFormSchema>;

// Portfolio Schema
export const PortfolioSchema = z
  .object({
    id: z.number().int().positive().optional(),
    title: z.object({
      en: z.string().min(1, {
        message: "Project name is required.",
      }),
      ar: z.string().min(1).optional(),
    }),
    description: z.object({
      en: z.string().min(1, {
        message: "Description is required.",
      }),
      ar: z.string().min(1).optional(),
    }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format.",
    }),
    attachments: z.array(z.instanceof(File)).optional(),
  })
  .strict();

export type PortfolioType = z.infer<typeof PortfolioSchema>;