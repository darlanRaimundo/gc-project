import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GameController {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  @Get('test')
  @ApiOperation({ summary: 'Endpoint de teste para Swagger' })
  test(): string {
    return 'GameController está funcionando';
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os jogos' })
  @ApiResponse({ status: 200, description: 'Lista de jogos', type: [Game] })
  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo jogo' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string' },
        appid: { type: 'number' },
        provider: { type: 'string' },
        categoria: { type: 'array', items: { type: 'string' } },
      },
      required: ['nome', 'categoria'],
    },
  })
  @ApiResponse({ status: 201, description: 'Jogo criado', type: Game })
  async create(
    @Body() data: { nome: string; appid?: number; provider?: string; categoria: string[] },
  ): Promise<Game> {
    const game = this.gameRepository.create({
      ...data,
      provider: data.provider,
    });
    return this.gameRepository.save(game);
  }
}
