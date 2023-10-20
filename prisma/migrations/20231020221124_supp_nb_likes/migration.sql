/*
  Warnings:

  - You are about to drop the column `nb_likes` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `nb_likes` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "nb_likes";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "nb_likes";
