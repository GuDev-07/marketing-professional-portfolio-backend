import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectRequestDto {
  @ApiProperty({ example: 'My project title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'web' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'A description of the project' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Client name', required: false })
  @IsOptional()
  @IsString()
  client?: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsString()
  @IsUrl()
  imageUrl: string;
}
