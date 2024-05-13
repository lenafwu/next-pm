import TaskForm from "@/app/UI/create-form";
import Table from "@/app/UI/table";

export default function TaskPage() {
  return (
    <div>
      <h1>Task List</h1>
      <Table />
      <TaskForm />
    </div>
  );
}
