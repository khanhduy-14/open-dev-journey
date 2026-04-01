import { ResponseBaseDto } from '@common/interfaces/common/response-base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto extends ResponseBaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  slug: string;
}
