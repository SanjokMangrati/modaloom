/*
  Warnings:

  - You are about to drop the column `gender` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `glasses` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `hairColor` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `outfit` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `shoeColor` on the `Avatar` table. All the data in the column will be lost.
  - Added the required column `clothColor` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clothType` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyeType` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyebrowType` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topType` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Made the column `skinColor` on table `Avatar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "gender",
DROP COLUMN "glasses",
DROP COLUMN "hairColor",
DROP COLUMN "outfit",
DROP COLUMN "shoeColor",
ADD COLUMN     "clothColor" TEXT NOT NULL,
ADD COLUMN     "clothType" TEXT NOT NULL,
ADD COLUMN     "eyeType" TEXT NOT NULL,
ADD COLUMN     "eyebrowType" TEXT NOT NULL,
ADD COLUMN     "facialHairType" TEXT,
ADD COLUMN     "topType" TEXT NOT NULL,
ALTER COLUMN "skinColor" SET NOT NULL;
