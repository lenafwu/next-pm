import { fetchTasks } from "@/app/lib/data";
import { Task } from "@/app/lib/definations";
import { DeleteTask, UpdateTask } from "@/app/UI/tasks/buttons";

export default async function TaskTable() {
  const tasks = await fetchTasks();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task Title</th>
          <th>Due Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description || "N/A"}</td>
            <td>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </td>
            <td>{task.status}</td>
            <td>
              <UpdateTask id={task.id} />
            </td>
            <td>
              <DeleteTask id={task.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
