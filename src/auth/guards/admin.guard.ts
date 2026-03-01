import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token ausente');
    }

    const token = authHeader.replace('Bearer ', '');

    const { data, error } = await this.supabase.client.auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Token inválido');
    }

    const profile = await this.prisma.profile.findUnique({
      where: { id: data.user.id },
      select: { role: true },
    });

    if (!profile) {
      throw new ForbiddenException('Perfil não encontrado para este usuário');
    }

    if (!profile.role || profile.role.toUpperCase() !== 'ADMIN') {
      throw new ForbiddenException('Acesso restrito a admin');
    }

    request.user = data.user;
    return true;
  }
}
