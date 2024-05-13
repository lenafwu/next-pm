import Form from "@/app/UI/edit-task";
import { fetchTaskById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const task = await fetchTaskById(id);

  return (
    <main>
      <Form task={task}></Form>
    </main>
  );
}
