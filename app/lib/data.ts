import prisma from "./prisma";

export async function fetchTasks() {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function fetchTaskById(id: string) {
  try {
    const task = await prisma.task.findUnique({ where: { id: id } });
    return task;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error("Failed to fetch task");
  }
}
