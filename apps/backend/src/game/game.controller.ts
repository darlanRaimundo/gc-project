import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw } from 'typeorm';
import { Game } from './game.entity';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Jogos')
@Controller('games')
export class GameController {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Busca um jogo pelo ID' })
  @ApiResponse({ status: 200, description: 'Jogo encontrado', type: Game })
  async findOne(@Param('id') id: string): Promise<Game> {
    return this.gameRepository.findOneOrFail({ where: { id } });
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os jogos com paginação, pesquisa e filtro' })
  @ApiResponse({ status: 200, description: 'Lista de jogos', type: [Game] })
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '12',
    @Query('search') search?: string,
    @Query('categoria') categoria?: string,
  ): Promise<{ data: Game[]; total: number; page: number; limit: number }> {
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.max(Number(limit), 1);

    const where: any = {};
    if (search) {
      where.nome = Like(`%${search}%`);
    }
    if (categoria) {
      where.categoria = Raw((alias) => `JSON_CONTAINS(${alias}, '["${categoria}"]')`);
    }

    const [data, total] = await this.gameRepository.findAndCount({
      where,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });
    return { data, total, page: pageNum, limit: limitNum };
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
