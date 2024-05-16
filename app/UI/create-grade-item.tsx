"use client";

import { useFormState } from "react-dom"; // Ensure this is a valid import path
import { createGradeItem } from "@/app/lib/actions"; // Adjust according to your actual import paths
import Link from "next/link";
import { Course } from "@prisma/client";
import { Button } from "@/app/UI/button";

export default function CreateGradeItemForm({
  courses,
}: {
  courses: Course[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createGradeItem, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      {/* Full Mark */}
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

      <div className="mt-6 flex justify-end space-x-4">
        <Link href="/dashboard">Cancel</Link>
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Grade Item
        </Button>
      </div>
    </form>
  );
}
