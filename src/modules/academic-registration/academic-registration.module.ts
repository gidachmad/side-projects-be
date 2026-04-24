import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [AuthModule, CourseModule, EnrollmentsModule]
})
export class AcademicRegistrationModule {}
