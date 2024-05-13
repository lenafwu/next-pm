import prisma from "./prisma";

export async function fetchTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}

export async function fetchTaskById(id: number) {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    return task;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error("Failed to fetch task");
  }
}
