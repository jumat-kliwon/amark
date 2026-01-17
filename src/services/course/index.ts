// services/course/index.ts
import axios from '@/lib/axios';
import type { CategoryResponse, CourseDetailResponse, CourseListResponse, CourseModuleDetailResponse, LessonDetail } from './type';

interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string | null;
  category?: string;
}

export const CourseService = {
  getCourseCategory: async (): Promise<CategoryResponse> => {
    const { data } = await axios.get('/categories');
    return data;
  },

  getCourses: async (params: GetCoursesParams) => {
    const { data } = await axios.get<CourseListResponse>(
      '/courses',
      { params }
    );
    return data;
  },

  getCourseDetail: async (slug: string): Promise<CourseDetailResponse> => {
    const { data } = await axios.get(`/courses/${slug}`);
    return data;
  },

  getCourseModule: async (slug: string): Promise<CourseModuleDetailResponse> => {
    const { data } = await axios.get(`/courses/${slug}/modules`);
    return data;
  },

  getCourseLessons: async (slug: string, id: number | null): Promise<LessonDetail> => {
    const { data } = await axios.get(`/courses/${slug}/lessons/${id}`);
    return data;
  },

  markLessonViewed: (slug: string, id: number | null) =>
    axios.post(`/courses/${slug}/lessons/${id}/mark-viewed`),

  markLessonDone: (slug: string, id: number | null) =>
    axios.post(`/courses/${slug}/lessons/${id}/toggle-completion`),
};
