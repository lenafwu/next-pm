"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { DateTime } from "luxon";

export type State = {
  errors?: {
    name?: string[];
    detail?: string[];
    status?: string[];
  };
  message?: string | null;
};

const taskSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Title is required" }),
  detail: z.string().optional(),
  dueDate: z.string(),
  status: z.enum(["pending", "completed"], {
    invalid_type_error: "Please select status.",
  }),
});

const courseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Course name is required" }),
});

const assignmentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Assignment name is required" }),
  detail: z.string().optional(),
  dueDate: z.string(),
  status: z.enum(["pending", "completed"], {
    invalid_type_error: "Please select status.",
  }),
  points: z.number().optional(),
  courseId: z.string(),
  gradeItemId: z.string().optional(),
});

const gradeItemSchema = z.object({
  id: z.string(),
  fullMark: z.coerce.number(),
  weight: z.coerce.number(),
  courseId: z.string(),
});

const CreateTask = taskSchema.omit({
  id: true,
  dueDate: true,
});
const UpdateTask = taskSchema.omit({ id: true });
const CreateCourse = courseSchema.omit({ id: true });
const CreateAssignment = assignmentSchema.omit({ id: true });
const CreateGradeItem = gradeItemSchema.omit({ id: true });

export async function createAssignment(prevState: State, formData: FormData) {
  const validatedAssgData = CreateAssignment.safeParse({
    name: formData.get("name"),
    detail: formData.get("detail"),
    dueDate: formData.get("dueDate"),
    status: formData.get("status"),
    courseId: formData.get("courseId"),
  });

  const validatedGradeItemData = CreateGradeItem.safeParse({
    fullMark: formData.get("fullMark"),
    weight: formData.get("weight"),
    courseId: formData.get("courseId"),
  });

  if (!validatedAssgData.success) {
    return {
      errors: validatedAssgData.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  if (!validatedGradeItemData.success) {
    return {
      errors: validatedGradeItemData.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { name, detail, dueDate, status, courseId } = validatedAssgData.data;

  const { fullMark, weight } = validatedGradeItemData.data;

  try {
    await prisma.$transaction(async (tx) => {
      const gradeItem = await tx.gradeItem.create({
        data: {
          fullMark,
          weight,
          courseId,
        },
      });

      await tx.assignment.create({
        data: {
          name,
          detail,
          dueDate: DateTime.fromISO(dueDate as string).toJSDate(),
          status,
          courseId,
          gradeItemId: gradeItem.id,
        },
      });
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return { message: "An error occurred while creating the assignment" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
  return { errors: {}, message: null };
}

export async function createTask(prevState: State, formData: FormData) {
  const validatedData = CreateTask.safeParse({
    name: formData.get("name"),
    detail: formData.get("detail"),
    status: formData.get("status"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }
  const dueDate = formData.get("dueDate");
  const { name, detail, status } = validatedData.data;

  try {
    await prisma.task.create({
      data: {
        name,
        detail,
        dueDate: DateTime.fromISO(dueDate as string).toJSDate(),
        status,
      },
    });
  } catch (error) {
    return { message: "An error occurred while creating the task" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// Update task
export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedData = UpdateTask.safeParse({
    name: formData.get("name"),
    detail: formData.get("detail"),
    dueDate: formData.get("dueDate"),
    status: formData.get("status"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { name, detail, dueDate, status } = validatedData.data;

  try {
    await prisma.task.update({
      where: { id: id },
      data: {
        name,
        detail,
        dueDate: DateTime.fromISO(dueDate as string).toJSDate(),
        status,
      },
    });
  } catch (error) {
    return { message: "An error occurred while updating the task" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// Delete task
export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id: id } });
    revalidatePath("/dashboard");
    return { message: "Task deleted successfully" };
  } catch (error) {
    return { message: "An error occurred while deleting the task" };
  }
}

// Create course
export async function createCourse(prevState: State, formData: FormData) {
  const validatedData = CreateCourse.safeParse({
    name: formData.get("name"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  const { name } = validatedData.data;

  try {
    await prisma.course.create({
      data: {
        name,
      },
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return { message: "An error occurred while creating the course" };
  }

  revalidatePath("/dashboard"); // Adjust the path as necessary for your application
  redirect("/dashboard"); // Adjust redirection as needed
  return { errors: {}, message: null };
}

export async function createGradeItem(prevState: State, formData: FormData) {
  const validatedData = CreateGradeItem.safeParse({
    fullMark: formData.get("fullMark"),
    weight: formData.get("weight"),
    courseId: formData.get("courseId"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  const { fullMark, weight, courseId } = validatedData.data;

  try {
    await prisma.gradeItem.create({
      data: {
        fullMark,
        weight,
        courseId,
      },
    });
  } catch (error) {
    console.error("Error creating grade item:", error);
    return { message: "An error occurred while creating the grade item" };
  }

  revalidatePath("/dashboard"); // Adjust the path as necessary for your application
  redirect("/dashboard"); // Adjust redirection as needed
  return { errors: {}, message: null };
}
