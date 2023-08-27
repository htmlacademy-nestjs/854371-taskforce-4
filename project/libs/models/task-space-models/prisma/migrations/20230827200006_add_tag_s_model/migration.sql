/*
  Warnings:

  - You are about to drop the column `categoryCategoryId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "categoryCategoryId",
DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "_TagsToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTask_AB_unique" ON "_TagsToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTask_B_index" ON "_TagsToTask"("B");

-- AddForeignKey
ALTER TABLE "_TagsToTask" ADD CONSTRAINT "_TagsToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTask" ADD CONSTRAINT "_TagsToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
