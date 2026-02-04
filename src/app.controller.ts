import { Controller, Get } from '@nestjs/common';
import { ProjectResponseDto } from './modules/projects/dto/project-response.dto';
import { ProjectsService } from './modules/projects/projects.service';

@Controller()
export class AppController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getRoot(): ProjectResponseDto[] {
    return this.projectsService.findAll();
  }
}
