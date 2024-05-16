import CourseForm from "@/app/UI/courses/create-course";
import Link from "next/link";
export default function CoursePage() {
  return (
    <div>
      <h1>Course List</h1>

      <CourseForm />
    </div>
  );
}
