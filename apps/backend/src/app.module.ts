import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    GameModule,
    // other modules
  ],
  // other properties
})
export class AppModule {}