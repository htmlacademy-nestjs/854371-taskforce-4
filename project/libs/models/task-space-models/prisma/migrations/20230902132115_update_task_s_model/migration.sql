/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_CategoryToTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('New', 'Cancelled', 'InProgress', 'Completed', 'Failed');

-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_B_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "coast" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "due_date" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'New';

-- DropTable
DROP TABLE "_CategoryToTask";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
