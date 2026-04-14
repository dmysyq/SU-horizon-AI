import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';
import { ROUTES } from '@/lib/constants';
import { MOCK_COURSES } from '@/data/mock';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  return createMetadata({
    title: course?.title ?? 'Курс',
    description: course?.description ?? '',
    path: `/courses/${slug}`,
  });
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-muted-foreground mt-1">{course.description}</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Уроки</h2>
        <div className="space-y-2">
          {course.lessons.map((lesson) => (
            <Card key={lesson.slug}>
              <CardHeader className="py-4">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{lesson.title}</span>
                  {lesson.hasTask && <span className="text-xs font-normal text-muted-foreground">есть задание</span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={ROUTES.LESSON(course.slug, lesson.slug)}>
                  <Button variant="outline" size="sm">Открыть урок</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
