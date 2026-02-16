import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginRequestDto } from './dto/login-request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly supabase: SupabaseService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Returns access token.' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequestDto): Promise<{ accessToken: string }> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error || !data?.session?.access_token) {
      throw new UnauthorizedException(error?.message ?? 'Invalid credentials');
    }

    return { accessToken: data.session.access_token };
  }
}
