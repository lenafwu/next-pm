"use client";

import { createAssignment } from "@/app/lib/actions"; // Ensure this action is defined in your actions file
import { useFormState } from "react-dom"; // Assuming this is a valid hook for form management
import Link from "next/link";
import { Course } from "@prisma/client";
import { Button } from "@/app/UI/button";
import { create } from "domain";

export default function CreateAssignmentForm({
  courses,
}: {
  courses: Course[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createAssignment, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      {/* Assignment Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Assignment Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter assignment name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {/*state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))*/}
      </div>

      {/* Assignment Detail */}
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          Detail
        </label>
        <textarea
          id="detail"
          name="detail"
          placeholder="Assignment detail"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div id="detail-error" aria-live="polite" aria-atomic="true">
        {/*state.errors?.detail &&
          state.errors.detail.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))*/}
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

      {/* Course Selection */}
      <div>
        <label
          htmlFor="courseId"
          className="block text-sm font-medium text-gray-700"
        >
          Select Course
        </label>
        <select
          id="courseId"
          name="courseId"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Please select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Full mark */}
      <div>
        <label
          htmlFor="fullMark"
          className="block text-sm font-medium text-gray-700"
        >
          Full Mark
        </label>
        <input
          type="number"
          id="fullMark"
          name="fullMark"
          required
          placeholder="Enter full mark"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Weight */}
      <div>
        <label
          htmlFor="weight"
          className="block text-sm font-medium text-gray-700"
        >
          Weight
        </label>
        <input
          type="number"
          step="0.01"
          id="weight"
          name="weight"
          required
          placeholder="Enter weight (percentage)"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Assignment Status */}
      <fieldset className="mt-4">
        <legend className="text-base font-medium text-gray-900">
          Set the assignment status
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
      </fieldset>

      <div className="mt-6 flex justify-end space-x-4">
        <Link href="/dashboard">Cancel</Link>
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Assignment
        </Button>
      </div>
    </form>
  );
}
