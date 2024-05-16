-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_relatedId_fkey" FOREIGN KEY ("relatedId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
