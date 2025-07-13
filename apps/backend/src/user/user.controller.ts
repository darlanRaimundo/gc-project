import { Controller, Get, Post, Body, UnauthorizedException, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gcprojectsecret';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado', type: User })
  async create(@Body() user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Realiza login do usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        senha: { type: 'string' },
      },
      required: ['email', 'senha'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: { example: { token: '...' } },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(
    @Body() body: { email: string; senha: string },
  ): Promise<{ token: string } | { error: string }> {
    const user = await this.userRepository.findOne({
      where: { email: body.email, senha: body.senha },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    return { token };
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna dados do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário', type: User })
  async me(@Req() req: import('express').Request): Promise<User | { error: string }> {
    const auth = req.headers.authorization;
    if (!auth) return { error: 'Token não informado' };
    try {
      const payload = jwt.verify(auth.replace('Bearer ', ''), JWT_SECRET) as any;
      const user = await this.userRepository.findOne({ where: { id: payload.id } });
      if (!user) return { error: 'Usuário não encontrado' };
      return user;
    } catch {
      return { error: 'Token inválido' };
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout do usuário (frontend deve remover o token)' })
  @ApiResponse({ status: 200, description: 'Logout realizado' })
  logout(): { message: string } {
    // JWT é stateless, apenas informe ao frontend remover o token
    return { message: 'Logout realizado. Remova o token no frontend.' };
  }
}
