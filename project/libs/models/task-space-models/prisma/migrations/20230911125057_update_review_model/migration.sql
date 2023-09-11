/*
  Warnings:

  - A unique constraint covering the columns `[task_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_task_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "reviews_task_id_key" ON "reviews"("task_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;
