import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {

  constructor(private prisma: PrismaService){}

  create(createOrderItemDto: CreateOrderItemDto) {
    return this.prisma.orderItem.create({
      data: createOrderItemDto
    });
  }

  findAll() {
    return this.prisma.orderItem.findMany();
  }

  findOne(id: string) {
    return this.prisma.orderItem.findUnique({ where : {id} });
  }

  update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return this.prisma.orderItem.update({
      where: {id},
      data: updateOrderItemDto
    });
  }

  remove(id: string) {
    return this.prisma.orderItem.delete({ where : {id} });
  }
}
