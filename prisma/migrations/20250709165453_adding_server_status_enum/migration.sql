/*
  Warnings:

  - The `status` column on the `Server` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ServerStatus" AS ENUM ('FUNCIONANDO', 'INOPERANTE');

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "status",
ADD COLUMN     "status" "ServerStatus" NOT NULL DEFAULT 'FUNCIONANDO';
