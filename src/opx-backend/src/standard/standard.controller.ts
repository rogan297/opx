import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StandardService } from './standard.service';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';

@Controller('standard')
export class StandardController {
  constructor(private readonly service: StandardService) {}

  @Post()
  create(@Body() dto: CreateStandardDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId?: string) {
    return this.service.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStandardDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
