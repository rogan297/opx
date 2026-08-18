import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionOrderService } from './production-order.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { UpdateProductionOrderDto } from './dto/update-production-order.dto';

@Controller('production-order')
export class ProductionOrderController {
  constructor(private readonly productionOrderService: ProductionOrderService) {}

  @Post()
  create(@Body() dto: CreateProductionOrderDto) {
    return this.productionOrderService.create(dto);
  }

  @Get()
  findAll() {
    return this.productionOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductionOrderDto) {
    return this.productionOrderService.update(id, dto);
  }

  @Patch(':id/advance')
  advanceStep(@Param('id') id: string) {
    return this.productionOrderService.advanceStep(id);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.productionOrderService.complete(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionOrderService.remove(id);
  }
}
