/*
  Warnings:

  - Added the required column `isOnline` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "isOnline" BOOLEAN NOT NULL;
