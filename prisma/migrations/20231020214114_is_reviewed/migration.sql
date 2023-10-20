/*
  Warnings:

  - You are about to drop the column `nb_likes` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `nb_reported` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "nb_likes",
DROP COLUMN "nb_reported",
ADD COLUMN     "is_reviewed" BOOLEAN NOT NULL DEFAULT false;
