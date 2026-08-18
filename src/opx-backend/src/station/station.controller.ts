import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  create(@Body() dto: CreateStationDto) {
    return this.stationService.create(dto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId?: string) {
    return this.stationService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStationDto) {
    return this.stationService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.remove(id);
  }
}
