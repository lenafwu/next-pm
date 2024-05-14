import Form from "@/app/UI/edit-task";
import { fetchTaskById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const task = await fetchTaskById(id);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <main>
      <Form task={task}></Form>
    </main>
  );
}
