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

// fetch courses
export async function fetchCourses() {
  try {
    const courses = await prisma.course.findMany();
    return courses;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error("Failed to fetch courses");
  }
}

// fetch course by id
export async function fetchCourseById(id: string) {
  try {
    const course = await prisma.course.findUnique({ where: { id: id } });
    return course;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error("Failed to fetch course");
  }
}

// fetch assignments
export async function fetchAssignments() {
  try {
    const assignments = await prisma.assignment.findMany();
    return assignments;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error("Failed to fetch assignments");
  }
}

// fetch assignment by id
export async function fetchAssignmentById(id: string) {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: id },
    });
    return assignment;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error("Failed to fetch assignment");
  }
}
