/*
  Warnings:

  - You are about to drop the column `propietarioId` on the `Instalacion` table. All the data in the column will be lost.
  - You are about to drop the `Propietario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cliente` to the `Instalacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Instalacion" DROP CONSTRAINT "Instalacion_propietarioId_fkey";

-- AlterTable
ALTER TABLE "Instalacion" DROP COLUMN "propietarioId",
ADD COLUMN     "cliente" TEXT NOT NULL;

-- DropTable
DROP TABLE "Propietario";
