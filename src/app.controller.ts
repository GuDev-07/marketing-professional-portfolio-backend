import { Controller, Get } from '@nestjs/common';
import { Project } from '@prisma/client';
import { ProjectsService } from './modules/projects/projects.service';

@Controller()
export class AppController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getRoot(): Promise<Project[]> {
    return this.projectsService.findAll();
  }
}
