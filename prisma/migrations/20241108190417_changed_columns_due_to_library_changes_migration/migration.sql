/*
  Warnings:

  - You are about to drop the column `accessories` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `clothType` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `clothesColor` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `eyeType` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `eyebrowType` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `facialHair` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `facialHairColor` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `hairColor` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `mouthType` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `skinColor` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `topType` on the `Avatar` table. All the data in the column will be lost.
  - Added the required column `options` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seed` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `style` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "accessories",
DROP COLUMN "clothType",
DROP COLUMN "clothesColor",
DROP COLUMN "eyeType",
DROP COLUMN "eyebrowType",
DROP COLUMN "facialHair",
DROP COLUMN "facialHairColor",
DROP COLUMN "hairColor",
DROP COLUMN "mouthType",
DROP COLUMN "skinColor",
DROP COLUMN "topType",
ADD COLUMN     "options" JSONB NOT NULL,
ADD COLUMN     "seed" TEXT NOT NULL,
ADD COLUMN     "style" TEXT NOT NULL;
