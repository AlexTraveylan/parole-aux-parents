/*
  Warnings:

  - Added the required column `nb_reported` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nb_reported` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "nb_reported" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "nb_reported" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
