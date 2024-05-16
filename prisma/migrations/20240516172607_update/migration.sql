/*
  Warnings:

  - You are about to drop the column `instructor` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `relatedId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskType` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `CourseSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GradePlan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseSchedule" DROP CONSTRAINT "CourseSchedule_courseId_fkey";

-- DropForeignKey
ALTER TABLE "GradePlan" DROP CONSTRAINT "GradePlan_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_relatedId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "instructor",
DROP COLUMN "isOnline";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "description",
DROP COLUMN "relatedId",
DROP COLUMN "taskType",
DROP COLUMN "title",
ADD COLUMN     "detail" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "CourseSchedule";

-- DropTable
DROP TABLE "GradePlan";

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "detail" TEXT,
    "status" TEXT NOT NULL,
    "points" DOUBLE PRECISION,
    "courseId" TEXT NOT NULL,
    "gradeItemId" TEXT,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeItem" (
    "id" TEXT NOT NULL,
    "fullMark" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "GradeItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_gradeItemId_key" ON "Assignment"("gradeItemId");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_gradeItemId_fkey" FOREIGN KEY ("gradeItemId") REFERENCES "GradeItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeItem" ADD CONSTRAINT "GradeItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
