import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários', type: [User] })
  findAll(): Promise<User[]> {
    // ...implementar busca de usuários...
    return Promise.resolve([]);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado', type: User })
  create(@Body() user: User): Promise<User> {
    // ...implementar criação de usuário...
    return Promise.resolve(user);
  }
}
