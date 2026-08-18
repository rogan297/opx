import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationQueueService } from './station-queue.service';
import { CreateStationQueueDto } from './dto/create-station-queue.dto';
import { UpdateStationQueueDto } from './dto/update-station-queue.dto';

@Controller('station-queue')
export class StationQueueController {
  constructor(private readonly stationQueueService: StationQueueService) {}

  @Post()
  enter(@Body() dto: CreateStationQueueDto) {
    return this.stationQueueService.enter(dto);
  }

  @Patch(':id/exit')
  exit(@Param('id') id: string) {
    return this.stationQueueService.exit(id);
  }

  @Get()
  findAll() {
    return this.stationQueueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationQueueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStationQueueDto) {
    return this.stationQueueService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationQueueService.remove(id);
  }
}
