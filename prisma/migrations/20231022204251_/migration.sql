/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "History_user_id_key" ON "History"("user_id");
