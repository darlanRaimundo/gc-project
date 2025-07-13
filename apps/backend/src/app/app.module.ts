import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',        // seu usuário do MySQL
      password: '88325536',   // sua senha do MySQL
      database: 'gc_project',  // nome do banco de dados
      autoLoadEntities: true,
      synchronize: true,       // use true só em desenvolvimento!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}