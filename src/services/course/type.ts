// services/course/type.ts
export interface Course {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  status: string;
  category: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
  };
  has_access: boolean;
}

export interface CourseListResponse {
  data: Course[];
  meta: {
    current_page: number;
    per_page: string;
    from: number;
    to: number;
  };
  links: {
    next: string | null;
    prev: string | null;
  };
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  parent_id: number | null
  created_at: string
  updated_at: string
  original_id: number
  order: number
  is_active: boolean
  children?: Category[]
}

export interface CategoryResponse {
  data: Category[]
}

// Response wrapper
export interface CourseDetailResponse {
  data: CourseDetail;
}

// Main course
export interface CourseDetail {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description: string;
  thumbnail: string;
  thumbnail_url: string;
  status: 'draft' | 'published' | string;
  is_featured: boolean;
  published_at: string | null;
  category: Category;
  instructor: Instructor;
  sections: Section[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Instructor {
  id: number;
  name: string;
  email: string;
}

export interface Section {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  sort_order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
}

// Lesson
export interface LessonModule {
  id: number;
  title: string;
  has_viewed: boolean;
  viewed_at: string | null;
  is_completed: boolean;
  completed_at: string | null;
}

// Course / Section
export interface CourseModule {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
  lessons: LessonModule[];
  created_at: string;
  updated_at: string;
}

// Progress
export interface CourseProgress {
  total_lessons: number;
  viewed_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
}

// API Response
export interface CourseModuleDetailResponse {
  data: CourseModule[];
  progress: CourseProgress;
}

export interface LessonDetail {
  data: {
    id: number;
    title: string;
    description: string | null;
    content_type: 'video' | 'article' | 'pdf' | string;
    content: string;
    sort_order: number;
    is_preview: boolean;
    is_completed: boolean;
    viewed_at: string; // ISO date
    completed_at: string; // ISO date
    created_at: string; // ISO date
    updated_at: string; // ISO date
  }
}
