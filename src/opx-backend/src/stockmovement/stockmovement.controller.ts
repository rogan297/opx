import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockmovementService } from './stockmovement.service';
import { CreateStockmovementDto } from './dto/create-stockmovement.dto';
import { UpdateStockmovementDto } from './dto/update-stockmovement.dto';

@Controller('stockmovement')
export class StockmovementController {
  constructor(private readonly stockmovementService: StockmovementService) {}

  @Post()
  create(@Body() createStockmovementDto: CreateStockmovementDto) {
    return this.stockmovementService.create(createStockmovementDto);
  }

  @Get()
  findAll() {
    return this.stockmovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockmovementService.findOne(id);
  }
  
  @Get('inventory/:inventoryId') // Mejor usar un nombre claro para el param
  findMovementsByInventory(@Param('inventoryId') inventoryId: string) {
    return this.stockmovementService.findByInventoryId(inventoryId);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockmovementDto: UpdateStockmovementDto) {
    return this.stockmovementService.update(id, updateStockmovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockmovementService.remove(id);
  }
}
