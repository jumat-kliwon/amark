'use client';

import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/course';
import { useState } from 'react';

export const useCourses = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data: dataCategory, isLoading: loadingDataCategory } = useQuery({
    queryKey: ['dataCategory'],
    queryFn: () => CourseService.getCourseCategory(),
  });

  const { data: courses, isLoading: loadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => CourseService.getCourses({ page, limit, search, category }),
  });

  return {
    dataCategory,
    loadingDataCategory,
    courses,
    loadingCourses,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    category,
    setCategory,
  };
};
