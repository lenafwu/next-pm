"use client";

import { createTask } from "@/app/lib/actions";
import { ClockIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/UI/button";
import Link from "next/link";
import { Course } from "@prisma/client";
import { useFormState } from "react-dom";

export default function TaskForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      {/* Task Title */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter task title"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div id="title-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      {/* Task Description */}
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="detail"
          name="detail"
          placeholder="Task description"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div id="description-error" aria-live="polite" aria-atomic="true">
        {state.errors?.detail &&
          state.errors.detail.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
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
          defaultValue={new Date().toISOString().slice(0, 10)}
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
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status &&
            state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </fieldset>

      <div className="mt-6 flex justify-end space-x-4">
        <Link href="/dashboard">Cancel</Link>
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Task
        </Button>
      </div>
    </form>
  );
}
