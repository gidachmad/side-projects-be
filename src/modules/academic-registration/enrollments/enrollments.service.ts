import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentBatchStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getCart(userId: number) {
    const data = await this.prisma.enrollmentBatch.findFirst({
      where: { studentId: userId, status: EnrollmentBatchStatus.DRAFT },
      include: {
        items: {
          include: {
            course: true
          },
        },
      },
    });


    return {
      message: `This is the cart for user with id ${userId}`,
      data
    }
  }

  async addCourse(userId: number, courseId: number){
    return this.prisma.$transaction(async (tx) => {
      // search, if not create
      let batch = await tx.enrollmentBatch.findFirst({
        where: { studentId: userId, status: EnrollmentBatchStatus.DRAFT }
      });

      if (!batch){
        batch = await tx.enrollmentBatch.create({
          data: { studentId: userId }
        });
      }

      // take course
      const course = await tx.courseAcademicRegistration.findUnique({
        where: { id: courseId }
      });

      if (!course) throw new NotFoundException('Course not Found')
      
      // atomic stock
      const updated = await tx.courseAcademicRegistration.updateMany({
        where: { id: courseId, stock: { gt:0 }},
        data: {stock: { decrement: 1 }},
      });

      if (updated.count === 0) throw new BadRequestException('Stock is empty')

      // insert into enrollment
      try {
        await tx.enrollmentAcademicRegistration.create({
          data: {
            batchId: batch.id,
            studentId: userId,
            courseId,
            lecturerId: course.lecturerId
          }
        });
      } catch (e) {
        throw new BadRequestException('Course is already taken')
      }

      return {
        message: 'Course berhasil ditambahkan'
      }
    })
  }

  async removeCourse(userId: number, courseId: number) {
    return this.prisma.$transaction(async (tx) => {
      const batch = await tx.enrollmentBatch.findFirst({
        where: { studentId: userId, status: EnrollmentBatchStatus.DRAFT },
      });

      if (!batch) throw new NotFoundException('Course List is Not Found');

      const item = await tx.enrollmentAcademicRegistration.findFirst({
        where: { batchId: batch.id, courseId },
      });

      if (!item) throw new NotFoundException('Course is not in the list');

      await tx.enrollmentAcademicRegistration.delete({
        where: { id: item.id },
      });

      await tx.courseAcademicRegistration.update({
        where: { id: courseId },
        data: { stock: { increment: 1 } },
      });

      return { message: 'Course berhasil dihapus' };
    });
  }

  async submitCourseList(userId: number) {
    const batch = await this.prisma.enrollmentBatch.findFirst({
      where: { studentId: userId, status: EnrollmentBatchStatus.DRAFT },
      include: { items: true },
    });

    if (!batch) throw new NotFoundException('Cart tidak ditemukan');
    if (batch.items.length === 0) {
      throw new BadRequestException('Cart kosong');
    }

    await this.prisma.enrollmentBatch.update({
      where: { id: batch.id },
      data: { status: EnrollmentBatchStatus.PENDING },
    });

    return { message: 'Course list is now waiting for approval' };
  }

  async getLecturer(lecturerId: number) {
    return this.prisma.enrollmentBatch.findMany({
      where: {
        status: EnrollmentBatchStatus.PENDING,
        items: {
          some: {
            lecturerId,
          },
        },
      },
      include: {
        student: true,
        items: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  async approveEnrollment(lecturerId: number, batchId: number) {
    const batch = await this.prisma.enrollmentBatch.findUnique({
      where: { id: batchId },
      include: { items: true },
    });

    if (!batch || batch.status !== EnrollmentBatchStatus.PENDING) {
      throw new BadRequestException('Invalid batch');
    }

    await this.prisma.enrollmentBatch.update({
      where: { id: batchId },
      data: { status: EnrollmentBatchStatus.APPROVED },
    });

    return { message: 'Approved' };
  }

  async rejectEnrollment(lecturerId: number, batchId: number) {
    return this.prisma.$transaction(async (tx) => {
      const batch = await tx.enrollmentBatch.findUnique({
        where: { id: batchId },
        include: { items: true },
      });

      if (!batch || batch.status !== EnrollmentBatchStatus.PENDING) {
        throw new BadRequestException('Invalid batch');
      }

      for (const item of batch.items) {
        await tx.courseAcademicRegistration.update({
          where: { id: item.courseId },
          data: { stock: { increment: 1 } },
        });
      }

      await tx.enrollmentBatch.update({
        where: { id: batchId },
        data: { status: EnrollmentBatchStatus.REJECTED },
      });

      return { message: 'Rejected' };
    });
  }
}