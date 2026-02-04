import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): ProjectResponseDto[] {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Project found',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id', ParseIntPipe) id: number): ProjectResponseDto {
    const project = this.projectsService.findOne(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
