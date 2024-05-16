"use client";
import { useActionState } from "react";
import { createCourse } from "@/app/lib/actions";
import { Button } from "@/app/UI/button";
import Link from "next/link";

export default function CreateCourseForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createCourse, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      {/* Course Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Course Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter course name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* Course Name 
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>*/}

      <div className="mt-6 flex justify-end space-x-4">
        <Link href="/dashboard">Cancel</Link>
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Course
        </Button>
      </div>
    </form>
  );
}
