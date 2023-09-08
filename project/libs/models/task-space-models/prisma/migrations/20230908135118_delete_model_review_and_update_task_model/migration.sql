/*
  Warnings:

  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_task_id_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "respondingExecutors" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "selected_executor" TEXT DEFAULT '';

-- DropTable
DROP TABLE "reviews";
