import { deleteTask } from "@/app/lib/actions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// Delete task button
export async function DeleteTask({ id }: { id: string }) {
  const deleteTaskWithId = deleteTask.bind(null, id);
  return (
    <form action={deleteTaskWithId}>
      <button>
        <TrashIcon className="w-5" />
        Delete
      </button>
    </form>
  );
}

// Edit task button
export function UpdateTask({ id }: { id: string }) {
  return (
    <Link href={`/tasks/${id}/edit`}>
      <button>
        <PencilIcon className="w-5" />
        Edit
      </button>
    </Link>
  );
}
