"use client";

import { useFormState } from "react-dom";
import { createTask } from "@/app/lib/actions";
import { ClockIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/UI/button";

export default function TaskForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);
  
  return (
    <form action={dispatch}>
      {/* Task Title */}
      <div>
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Enter task title"
        />
      </div>

      {/* Task Description */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Task description"
        />
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" />
      </div>

      {/* Task Status */}
      <fieldset>
        <legend>Set the task status</legend>
        <div>
          <div>
            <input id="pending" name="status" type="radio" value="pending" />
            <label htmlFor="pending">Pending</label>
          </div>
          <div>
            <input
              id="completed"
              name="status"
              type="radio"
              value="completed"
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
      </fieldset>

      <div>
        <Button type="button">Cancel</Button>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
