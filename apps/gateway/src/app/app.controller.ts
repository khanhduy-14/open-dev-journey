import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/interfaces/response.interface';

@Controller('gateway')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    throw new BadRequestException();
    const result = this.appService.getData();
    return new ResponseDto({ data: result });
  }
}
