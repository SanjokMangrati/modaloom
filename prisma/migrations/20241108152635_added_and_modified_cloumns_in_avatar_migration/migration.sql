/*
  Warnings:

  - You are about to drop the column `clothColor` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `facialHairType` on the `Avatar` table. All the data in the column will be lost.
  - Added the required column `accessories` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clothesColor` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hairColor` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mouthType` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "clothColor",
DROP COLUMN "facialHairType",
ADD COLUMN     "accessories" TEXT NOT NULL,
ADD COLUMN     "clothesColor" TEXT NOT NULL,
ADD COLUMN     "facialHair" TEXT,
ADD COLUMN     "facialHairColor" TEXT,
ADD COLUMN     "hairColor" TEXT NOT NULL,
ADD COLUMN     "mouthType" TEXT NOT NULL,
ALTER COLUMN "topType" DROP NOT NULL;
