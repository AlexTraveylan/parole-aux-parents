/*
  Warnings:

  - Added the required column `school_name` to the `Conseil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conseil" ADD COLUMN     "school_name" TEXT NOT NULL;
