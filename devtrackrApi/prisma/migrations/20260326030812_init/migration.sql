/*
  Warnings:

  - You are about to drop the column `category` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "date" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Expense_userId_idx" ON "Expense"("userId");

-- CreateIndex
CREATE INDEX "Income_userId_idx" ON "Income"("userId");

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
