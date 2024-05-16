import { GradeItem } from "@prisma/client";
import { fetchGradeItemsByCourseId } from "@/app/lib/data";
export default async function GradeItemList({
  courseId,
}: {
  courseId: string;
}) {
  const gradeItems = await fetchGradeItemsByCourseId(courseId);

  return (
    <div className="space-y-2">
      {gradeItems.map((gradeItem) => (
        <div
          key={gradeItem.id}
          className="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-2 border border-gray-200"
        >
          <div className="text-sm font-medium text-gray-900">
            {gradeItem.assignment?.name}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Full Mark: {gradeItem.fullMark}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Weight: {gradeItem.weight}
          </div>
        </div>
      ))}
    </div>
  );
}
