import { Injectable, Inject } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InventoryService {

  constructor(private prisma : PrismaService, @Inject('RABBIT_SERVICE') private readonly client: ClientProxy,){}

  async create(createInventoryDto: CreateInventoryDto) {
    const inventory = await this.prisma.inventory.create({
      data: {
        productId: createInventoryDto.productId,
        quantityAvailable: createInventoryDto.quantityAvailable
        
      },
      include: { product: true }
    });

    this.client.emit('inventory.updated', {
      productId: inventory.productId,
      productName: inventory.product.name,
      quantity: inventory.quantityAvailable,
      tenantId: inventory.product.tenantId,
    });

    return inventory;
  }

  findAll() { 
    return this.prisma.inventory.findMany({include: {product: true  }});
  }

  findOne(id: string) {
    return this.prisma.inventory.findUnique({where:{id}, include: {product: true}});
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.prisma.inventory.update({
      where: { id },
      data: updateInventoryDto,
      include: { product: true }
    });

    this.client.emit('inventory.updated', {
      productId: inventory.productId,
      quantity: inventory.quantityAvailable,
      tenantId: inventory.product.tenantId,
      action: 'manual_update'
    });

    return inventory;
  }

  remove(id: string) {
    return this.prisma.inventory.delete({where:{id}});
  }
}
