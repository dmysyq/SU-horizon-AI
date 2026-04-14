import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createMetadata } from '@/lib/metadata';
import { MOCK_COURSES } from '@/data/mock';
import { ROUTES } from '@/lib/constants';
import { LessonContent } from './_components/lesson-content';
import { SubmitTaskForm } from '@/components/lesson/submit-task-form';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  const lesson = course?.lessons.find((l) => l.slug === lessonSlug);
  return createMetadata({
    title: lesson?.title ?? 'Урок',
    description: course?.title ?? '',
    path: `/courses/${slug}/learn/${lessonSlug}`,
  });
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  const lesson = course?.lessons.find((l) => l.slug === lessonSlug);
  if (!course || !lesson) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href={ROUTES.COURSE(slug)} className="text-sm text-muted-foreground hover:text-foreground">
          ← {course.title}
        </Link>
        <h1 className="text-2xl font-bold mt-1">{lesson.title}</h1>
      </div>

      <Tabs defaultValue="material">
        <TabsList>
          <TabsTrigger value="material">Материал</TabsTrigger>
          {lesson.hasTask && <TabsTrigger value="task">Задание</TabsTrigger>}
          {lesson.hasReport && <TabsTrigger value="report">Отчёт</TabsTrigger>}
        </TabsList>
        <TabsContent value="material">
          <LessonContent courseSlug={slug} lessonSlug={lessonSlug} />
        </TabsContent>
        {lesson.hasTask && (
          <TabsContent value="task">
            <SubmitTaskForm courseSlug={slug} lessonSlug={lessonSlug} type="test" />
          </TabsContent>
        )}
        {lesson.hasReport && (
          <TabsContent value="report">
            <SubmitTaskForm courseSlug={slug} lessonSlug={lessonSlug} type="report" />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
