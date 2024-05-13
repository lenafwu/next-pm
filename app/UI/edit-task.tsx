"use client";

import { updateTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Button } from "@/app/UI/button";
import Link from "next/link";

export default function EditTaskForm({ task }) {
  const initialState = { message: null, errors: {} };
  const updateTaskWithId = updateTask.bind(null, task.id);
  const [state, dispatch] = useFormState(updateTaskWithId, initialState);
  return (
    <form action={dispatch}>
      {/* Task Title */}
      <div>
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter task title"
          defaultValue={task.title} // Pre-fill with task data
        />
      </div>

      {/* Task Description */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Task description"
          defaultValue={task.description} // Pre-fill with task data
        />
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={task.dueDate} // Pre-fill with task data
        />
      </div>

      {/* Task Status */}
      <fieldset>
        <legend>Set the task status</legend>
        <div>
          <div>
            <input
              id="pending"
              name="status"
              type="radio"
              value="pending"
              defaultChecked={task.status === "pending"} // Pre-check based on task data
            />
            <label htmlFor="pending">Pending</label>
          </div>
          <div>
            <input
              id="completed"
              name="status"
              type="radio"
              value="completed"
              defaultChecked={task.status === "completed"} // Pre-check based on task data
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
      </fieldset>
      <Button type="submit">Submit</Button>
      <Link href="/tasks">Cancel</Link>
    </form>
  );
}
