/*
  Warnings:

  - You are about to drop the column `post_id` on the `comments` table. All the data in the column will be lost.
  - Added the required column `task_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "post_id",
ADD COLUMN     "task_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "review_text" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
