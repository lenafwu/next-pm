import TaskForm from "@/app/UI/create-form";
import TaskTable from "@/app/UI/table";
import CourseTable from "@/app/UI/courses/table";
import { fetchCourses } from "@/app/lib/data";
import Link from "next/link";

export default async function TaskPage() {
  const courses = await fetchCourses();
  return (
    <div>
      <h1>Task List</h1>
      {/* Task Table */}
      <TaskTable />

      <h1>Course List</h1>
      {/* Course Table */}

      <CourseTable courses={courses} />

      {/* Assignment list */}
      {/* Course list */}

      {/* write a create task button here that link to "/create" */}
      <Link href="/dashboard/tasks/create">+ Create Task</Link>
      <Link href="/dashboard/courses/create">+ Create Course</Link>
    </div>
  );
}
