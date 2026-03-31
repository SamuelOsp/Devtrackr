/*
  Warnings:

  - You are about to drop the column `source` on the `Income` table. All the data in the column will be lost.
  - Made the column `description` on table `Income` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Income" DROP COLUMN "source",
ALTER COLUMN "description" SET NOT NULL;
