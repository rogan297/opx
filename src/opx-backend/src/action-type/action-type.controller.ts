import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ActionTypeService } from './action-type.service';
import { CreateActionTypeDto } from './dto/create-action-type.dto';
import { UpdateActionTypeDto } from './dto/update-action-type.dto';

@Controller('action-type')
export class ActionTypeController {
  constructor(private readonly service: ActionTypeService) {}

  @Post()
  create(@Body() dto: CreateActionTypeDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateActionTypeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
