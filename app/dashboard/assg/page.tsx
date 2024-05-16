import CreateAssignmentForm from "@/app/UI/create-assg";
import CreateGradeItemForm from "@/app/UI/create-grade-item";
import { fetchCourses } from "@/app/lib/data";

export default async function CreateAssignmentPage() {
  const courses = await fetchCourses();
  return (
    <div>
      <h1>Create a New Assignment</h1>
      <CreateAssignmentForm courses={courses} />
    </div>
  );
}
