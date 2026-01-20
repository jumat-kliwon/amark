// hooks/useLesson.ts
'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CourseService } from '@/services/course';
import { useSlug } from './use-slug';

export function useLesson() {
  const slug = useSlug();
  const queryClient = useQueryClient();
  const [idLessons, setIdLessons] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { data: detailCourse, isLoading: loadingDetailCourse } = useQuery({
    queryKey: ['detailCourse', slug],
    queryFn: () => CourseService.getCourseDetail(slug ?? ''),
    enabled: !!slug,
  });

  const { data: moduleList, isLoading: loadingModuleList } = useQuery({
    queryKey: ['moduleList', slug],
    queryFn: () => CourseService.getCourseModule(slug ?? ''),
    enabled: !!slug,
  });

  const { data: lessonDetail, isLoading: loadingLessonDetail } = useQuery({
    queryKey: ['lessonDetail', idLessons],
    queryFn: () => CourseService.getCourseLessons(slug ?? '', idLessons),
    enabled: !!idLessons,
  });

  useEffect(() => {
    if (idLessons) {
      markLessonViewed(idLessons);
    }
  }, [idLessons]);

  const { mutate: markLessonViewed, isPending: loadingMarkViewed } =
    useMutation({
      mutationFn: (idx: number) => CourseService.markLessonViewed(slug!, idx),

      onSuccess: () => {
        // refresh lesson & module progress
        queryClient.invalidateQueries({
          queryKey: ['moduleList', slug],
        });

        queryClient.invalidateQueries({
          queryKey: ['lessonDetail', slug, idLessons],
        });
      },
    });

  const { mutate: markLessonDone, isPending: loadingMarkDone } = useMutation({
    mutationFn: (idx: number) => CourseService.markLessonDone(slug!, idx),

    onSuccess: () => {
      // refresh lesson & module progress
      queryClient.invalidateQueries({
        queryKey: ['moduleList', slug],
      });

      queryClient.invalidateQueries({
        queryKey: ['lessonDetail', slug, idLessons],
      });

      setOpenConfirm(true);
    },
  });

  return {
    detailCourse,
    loadingDetailCourse,
    moduleList,
    loadingModuleList,
    lessonDetail,
    loadingLessonDetail,
    setIdLessons,
    markLessonViewed,
    loadingMarkViewed,
    openConfirm,
    setOpenConfirm,
    idLessons,
    markLessonDone,
    loadingMarkDone,
  };
}
