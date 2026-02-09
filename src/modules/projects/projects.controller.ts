import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of projects',
    isArray: true,
  })
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Project found',
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    const project = await this.projectsService.findOne(id);

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }
}
