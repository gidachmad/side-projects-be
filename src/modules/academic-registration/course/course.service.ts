/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(lecturerId: number, createCourseDto: CreateCourseDto) {
    const createdCourse = await this.prisma.courseAcademicRegistration.create({
      data: {
        name: createCourseDto.name,
        code: createCourseDto.code,
        stock: createCourseDto.stock,
        lecturer: {
          connect: { id: lecturerId },
        },
      },
    });

    return {
      message: 'Course created successfully',
      data: {
        course: {
          name: createdCourse.name,
          code: createdCourse.code,
          stock: createdCourse.stock,
        },
      },
    };
  }

  async findAll() {
    return {
      message: 'Courses retrieved successfully',
      data: {
        courses: await this.prisma.courseAcademicRegistration.findMany({}),
      },
    };
  }


  async update(lecturerId: number, courseId: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.prisma.courseAcademicRegistration.findUnique({
      where: { id: Number(courseId) }
    });

    if (!course) throw new NotFoundException('Course not found');
    if (course.lecturerId !== lecturerId) throw new ForbiddenException('You do not have permission to update this course');

    const updatedCourse = await this.prisma.courseAcademicRegistration.update({
      where: { id: Number(courseId) },
      data: updateCourseDto,
    });

    return {
      message: 'Course updated successfully',
      data: {
        course: {
          name: updatedCourse.name,
          code: updatedCourse.code,
          stock: updatedCourse.stock,
        },
      },
    };
  }

  async remove(lecturerId: number, courseId: string) {
    const course = await this.prisma.courseAcademicRegistration.findUnique({
      where: { id: Number(courseId) },
    });

    if (!course) throw new NotFoundException('Course not found');
    if (course.lecturerId !== lecturerId) throw new ForbiddenException('You do not have permission to delete this course');

    const deletedCourse = await this.prisma.courseAcademicRegistration.delete({
      where: { id: Number(courseId) },
    });
    return {
      message: 'Course deleted successfully',
      data: {
        course: {
          name: deletedCourse.name,
          code: deletedCourse.code,
          stock: deletedCourse.stock,
        },
      },
    }; 
  }
}

