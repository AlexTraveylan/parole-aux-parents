/*
  Warnings:

  - You are about to drop the `LikeComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LikeQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "LikeQuestion" DROP CONSTRAINT "LikeQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ReportComment" DROP CONSTRAINT "ReportComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ReportQuestion" DROP CONSTRAINT "ReportQuestion_questionId_fkey";

-- DropTable
DROP TABLE "LikeComment";

-- DropTable
DROP TABLE "LikeQuestion";

-- DropTable
DROP TABLE "ReportComment";

-- DropTable
DROP TABLE "ReportQuestion";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "nb_likes" INTEGER NOT NULL,
    "author_id" TEXT NOT NULL,
    "questionId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "nb_likes" INTEGER NOT NULL,
    "author_id" TEXT NOT NULL,
    "questionId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
