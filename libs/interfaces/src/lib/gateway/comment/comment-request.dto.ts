import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postId: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  parentId: string | null;
}
