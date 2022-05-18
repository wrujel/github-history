import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as info from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return {
      serverStatus: 'Ok',
      version: info.version,
      name: info.description,
      author: info.author,
    };
  }
}
