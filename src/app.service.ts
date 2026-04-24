import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is BE for Regid\'s Side Projects, It\'s intended to be used as a backend for my side projects, it contains multiple APIs that are used for different side projects APPs';
  }
}
