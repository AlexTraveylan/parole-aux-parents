/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Conseil` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conseil_password_key" ON "Conseil"("password");
