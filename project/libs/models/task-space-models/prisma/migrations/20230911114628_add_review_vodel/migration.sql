-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "text_review" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "assessment" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
