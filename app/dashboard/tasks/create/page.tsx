import TaskForm from "@/app/UI/create-form";
import { fetchCourses } from "@/app/lib/data";

export default async function TaskPage() {
  const courses = await fetchCourses();

  return (
    <div>
      <h1>Create a New Task</h1>
      <TaskForm />
    </div>
  );
}
