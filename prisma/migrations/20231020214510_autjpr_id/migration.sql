/*
  Warnings:

  - You are about to drop the column `author` on the `LikeComment` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `LikeQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `ReportComment` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `ReportQuestion` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `LikeComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `LikeQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `ReportComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `ReportQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LikeComment" DROP COLUMN "author",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LikeQuestion" DROP COLUMN "author",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReportComment" DROP COLUMN "author",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReportQuestion" DROP COLUMN "author",
ADD COLUMN     "author_id" TEXT NOT NULL;
