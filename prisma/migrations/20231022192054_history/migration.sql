-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConseilToHistory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConseilToHistory_AB_unique" ON "_ConseilToHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_ConseilToHistory_B_index" ON "_ConseilToHistory"("B");

-- AddForeignKey
ALTER TABLE "_ConseilToHistory" ADD CONSTRAINT "_ConseilToHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Conseil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConseilToHistory" ADD CONSTRAINT "_ConseilToHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;
