import { Injectable } from '@nestjs/common';
import { ProjectResponseDto } from './dto/project-response.dto';

@Injectable()
export class ProjectsService {
  private readonly projects: ProjectResponseDto[] = [
    {
      id: 1,
      title: 'Project Alpha',
      category: 'Web Development',
      description: 'A web development project for a client.',
      client: 'Client A',
      imageURL: 'https://example.com/images/project-alpha.jpg',
    },
    {
      id: 2,
      title: 'Tráfego Pago Etec',
      category: 'Tráfego Pago',
      description: 'Estratégia de anúncios com alto ROI.',
      client: 'Etec APAN',
      imageURL: 'https://picsum.photos/id/48/800/600',
    },
  ];

  findAll(): ProjectResponseDto[] {
    return this.projects;
  }

  findOne(id: number): ProjectResponseDto | undefined {
    return this.projects.find((p) => p.id === id);
  }
}
