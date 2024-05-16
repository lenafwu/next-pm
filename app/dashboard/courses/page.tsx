import CourseTable from "@/app/UI/courses/table";
import { fetchCourses } from "@/app/lib/data";

export default async function CoursePage() {
  const courses = await fetchCourses();

  return (
    <div>
      <h1>Course List</h1>
      <CourseTable courses={courses} />
    </div>
  );
}
