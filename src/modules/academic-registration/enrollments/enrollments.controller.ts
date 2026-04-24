import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Role } from '@prisma/client';
import { ApiRole, Roles } from '../auth/decorators/roles.decorator';
import { AddCourseDto } from './dto/add-course.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('academic-registration/enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('cart')
  @Roles(Role.USER)
  @ApiRole(Role.USER)
  @ApiTags(Role.USER+` APIs`)
  getCart(@Req() req: any) {
    return this.enrollmentsService.getCart(Number(req.user.id));
  }

  @Post('cart')
  @Roles(Role.USER)
  @ApiRole(Role.USER)
  @ApiTags(Role.USER+` APIs`)
  addCourse(@Req() req: any, @Body() body: AddCourseDto) {
    return this.enrollmentsService.addCourse(req.user.id, body.courseId);
  }

  @Delete('cart/:courseId')
  @Roles(Role.USER)
  @ApiRole(Role.USER)
  @ApiTags(Role.USER+` APIs`)
  removeCourse(@Req() req: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.removeCourse(req.user.id, Number(courseId));
  }

  @Post('cart/submit')
  @Roles(Role.USER)
  @ApiRole(Role.USER)
  @ApiTags(Role.USER+` APIs`)
  submitCourseList(@Req() req: any) {
    return this.enrollmentsService.submitCourseList(req.user.id);
  }

  @Get('lecturer')
  @Roles(Role.LECTURER)
  @ApiRole(Role.LECTURER)
  @ApiTags(Role.LECTURER+` APIs`)
  getLecturer(@Req() req: any) {
    return this.enrollmentsService.getLecturer(req.user.id);
  }

  @Patch('lecturer/:enrollmentId/approve')
  @Roles(Role.LECTURER)
  @ApiRole(Role.LECTURER)
  @ApiTags(Role.LECTURER+` APIs`)
  approveEnrollment(@Req() req: any, @Param('enrollmentId') enrollmentId: string) {
    return this.enrollmentsService.approveEnrollment(req.user.id, Number(enrollmentId));
  }

  @Patch('lecturer/:enrollmentId/reject')
  @Roles(Role.LECTURER)
  @ApiRole(Role.LECTURER)
  @ApiTags(Role.LECTURER+` APIs`)
  rejectEnrollment(@Req() req: any, @Param('enrollmentId') enrollmentId: string) {
    return this.enrollmentsService.rejectEnrollment(req.user.id, Number(enrollmentId));
  }
}
