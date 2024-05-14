"use client";

import { updateTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Button } from "@/app/UI/button";
import Link from "next/link";

export default function EditTaskForm({ task }) {
  const initialState = { message: "", errors: {} };
  const updateTaskWithId = updateTask.bind(null, task.id);
  const [state, dispatch] = useFormState(updateTaskWithId, initialState);
  return (
    <form action={dispatch} className="space-y-6">
      {/* Task Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter task title"
          defaultValue={task.title}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Task Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Task description"
          defaultValue={task.description}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Due Date */}
      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={task.dueDate}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Task Status */}
      <fieldset className="mt-4">
        <legend className="text-base font-medium text-gray-900">
          Set the task status
        </legend>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              id="pending"
              name="status"
              type="radio"
              value="pending"
              defaultChecked={task.status === "pending"}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              htmlFor="pending"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Pending
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="completed"
              name="status"
              type="radio"
              value="completed"
              defaultChecked={task.status === "completed"}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              htmlFor="completed"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Completed
            </label>
          </div>
        </div>
      </fieldset>

      <div className="mt-6 flex justify-end space-x-4">
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </Button>
        <Link href="/tasks">Cancel</Link>
      </div>
    </form>
  );
}
