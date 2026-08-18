import { Module } from '@nestjs/common';
import { StockmovementService } from './stockmovement.service';
import { StockmovementController } from './stockmovement.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockmovementController],
  providers: [StockmovementService],
})
export class StockmovementModule {}
