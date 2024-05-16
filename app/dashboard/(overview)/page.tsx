import TaskForm from "@/app/UI/create-task";
import TaskTable from "@/app/UI/table";
import AssignmentTable from "@/app/UI/assg/table";
import CourseTable from "@/app/UI/courses/table";
import { fetchAssignments, fetchCourses } from "@/app/lib/data";
import Link from "next/link";

export default async function TaskPage() {
  const courses = await fetchCourses();
  const assignments = await fetchAssignments();

  return (
    <div>
      <h1>Task List</h1>
      {/* Task Table */}
      <TaskTable />

      <h1>Course List</h1>
      {/* Course Table */}

      <CourseTable courses={courses} />

      {/* Assignment list */}
      <h1>Assignment List</h1>
      <AssignmentTable assignments={assignments} />
      {/* Course list */}

      {/* write a create task button here that link to "/create" */}
      <div className="flex space-x-4">
        <Link href="/dashboard/tasks/create" passHref>
          <div className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
            + Create Task
          </div>
        </Link>
        <Link href="/dashboard/courses/create" passHref>
          <div className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
            + Create Course
          </div>
        </Link>
        <Link href="/dashboard/assg" passHref>
          <div className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
            + Create Assignment
          </div>
        </Link>
      </div>
    </div>
  );
}
