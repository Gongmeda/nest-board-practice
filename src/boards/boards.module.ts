import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardRepository } from './board.repository';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
