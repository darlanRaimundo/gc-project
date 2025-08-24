import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categories')
export class CategoryController {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias' })
  async findAll() {
    const qb = this.repo.createQueryBuilder('category');

    const [data, total] = await qb.getManyAndCount();

    return { data, total };
  }
}
