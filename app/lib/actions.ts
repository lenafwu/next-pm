"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export type State = {
  errors?: string[];
  message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("dueDate") as string;
  const status = formData.get("status") as "pending" | "completed";

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        status,
      },
    });
  } catch (error) {
    return { message: "An error occurred while creating the task" };
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}

// Delete task
export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    revalidatePath("/tasks");
    return { message: "Task deleted successfully" };
  } catch (error) {
    return { message: "An error occurred while deleting the task" };
  }
}

// Update task
export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("dueDate") as string;
  const status = formData.get("status") as "pending" | "completed";

  try {
    await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        status,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while updating the task" };
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}
