import { Module } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthController } from './auth.controller';
import { AdminGuard } from './guards/admin.guard';

@Module({
  controllers: [AuthController],
  providers: [SupabaseService, AdminGuard],
  exports: [SupabaseService, AdminGuard],
})
export class AuthModule {}
