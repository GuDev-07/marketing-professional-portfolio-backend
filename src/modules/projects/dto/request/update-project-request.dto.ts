import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProjectRequestDto {
  @ApiPropertyOptional({ example: 'My project title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'web' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'A description of the project' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Client name' })
  @IsOptional()
  @IsString()
  client?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;
}
