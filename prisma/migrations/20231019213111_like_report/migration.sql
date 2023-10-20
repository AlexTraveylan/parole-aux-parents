/*
  Warnings:

  - You are about to drop the column `nb_likes` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `nb_reported` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "nb_likes",
DROP COLUMN "nb_reported";

-- CreateTable
CREATE TABLE "LikeQuestion" (
    "id" TEXT NOT NULL,
    "nb_likes" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "LikeQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeComment" (
    "id" TEXT NOT NULL,
    "nb_likes" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "LikeComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportQuestion" (
    "id" TEXT NOT NULL,
    "nb_likes" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "ReportQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportComment" (
    "id" TEXT NOT NULL,
    "nb_likes" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "ReportComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikeQuestion" ADD CONSTRAINT "LikeQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeComment" ADD CONSTRAINT "LikeComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportQuestion" ADD CONSTRAINT "ReportQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportComment" ADD CONSTRAINT "ReportComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
