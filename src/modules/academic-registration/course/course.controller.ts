import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Role } from '@prisma/client';
import { ApiRole, Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('academic-registration/course')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @Roles(Role.LECTURER)
  @ApiRole(Role.LECTURER)
  @ApiTags(Role.LECTURER+` APIs`)
  create(@Req() req: any, @Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(req.user.id, createCourseDto);
  }

  @Get('all')
  findAll() {
    return this.courseService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.courseService.findOne(+id);
  // }

  @Patch('edit/:courseId')
  @Roles(Role.LECTURER)
  @ApiRole(Role.LECTURER)
  @ApiTags(Role.LECTURER+` APIs`)
  update(@Req() req: any, @Param('courseId') courseId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(req.user.id, courseId, updateCourseDto);
  }

  @Delete('delete/:courseId')
  @Roles(Role.LECTURER)
  @ApiRole(Role.LECTURER)
  @ApiTags(Role.LECTURER+` APIs`)
  remove(@Req() req: any, @Param('courseId') courseId: string) {
    return this.courseService.remove(req.user.id, courseId);
  }
}
