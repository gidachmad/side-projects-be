/*
  Warnings:

  - You are about to drop the column `status` on the `EnrollmentAcademicRegistration` table. All the data in the column will be lost.
  - Added the required column `batchId` to the `EnrollmentAcademicRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnrollmentBatchStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "EnrollmentAcademicRegistration" DROP COLUMN "status",
ADD COLUMN     "batchId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "EnrollmentStatus";

-- CreateTable
CREATE TABLE "EnrollmentBatch" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "status" "EnrollmentBatchStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrollmentBatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnrollmentAcademicRegistration" ADD CONSTRAINT "EnrollmentAcademicRegistration_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "EnrollmentBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentBatch" ADD CONSTRAINT "EnrollmentBatch_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "UserAcademicRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
