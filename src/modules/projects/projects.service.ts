import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id: BigInt(id) },
    });
  }

  async create(data: {
    title: string;
    category: string;
    description: string;
    client?: string | null;
    imageUrl: string;
  }): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      category: string;
      description: string;
      client?: string | null;
      imageUrl: string;
    }>,
  ): Promise<Project> {
    return this.prisma.project.update({ where: { id: BigInt(id) }, data });
  }

  async remove(id: number): Promise<Project> {
    return this.prisma.project.delete({ where: { id: BigInt(id) } });
  }
}
