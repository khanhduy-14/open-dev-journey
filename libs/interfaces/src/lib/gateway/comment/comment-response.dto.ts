import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseBaseDto } from '../../common/response-base.dto';
import { IsNotEmpty } from 'class-validator';

export class CommentResponseDto extends ResponseBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsNotEmpty()
  postId: string;

  @ApiProperty()
  @IsNotEmpty()
  likedCount: string;

  @ApiPropertyOptional({ nullable: true })
  parentId: string | null;
}
