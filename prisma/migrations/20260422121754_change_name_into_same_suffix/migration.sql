/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_lecturerId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_lecturerId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Enrollment";

-- CreateTable
CREATE TABLE "CourseAcademicRegistration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "lecturerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseAcademicRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrollmentAcademicRegistration" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "lecturerId" INTEGER NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrollmentAcademicRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseAcademicRegistration_code_key" ON "CourseAcademicRegistration"("code");

-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentAcademicRegistration_studentId_courseId_key" ON "EnrollmentAcademicRegistration"("studentId", "courseId");

-- AddForeignKey
ALTER TABLE "CourseAcademicRegistration" ADD CONSTRAINT "CourseAcademicRegistration_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "UserAcademicRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentAcademicRegistration" ADD CONSTRAINT "EnrollmentAcademicRegistration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "UserAcademicRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentAcademicRegistration" ADD CONSTRAINT "EnrollmentAcademicRegistration_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "CourseAcademicRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentAcademicRegistration" ADD CONSTRAINT "EnrollmentAcademicRegistration_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "UserAcademicRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
