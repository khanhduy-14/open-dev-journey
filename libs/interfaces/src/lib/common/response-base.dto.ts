import { ApiProperty } from '@nestjs/swagger';

export class ResponseBaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
