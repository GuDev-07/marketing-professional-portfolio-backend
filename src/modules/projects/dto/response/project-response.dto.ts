import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'My project title' })
  title: string;

  @ApiProperty({ example: 'web' })
  category: string;

  @ApiProperty({ example: 'A description of the project' })
  description: string;

  @ApiProperty({ example: 'Client name', required: false })
  client?: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  imageUrl: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;
}
