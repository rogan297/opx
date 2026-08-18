import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {

  constructor(private prisma : PrismaService){}

  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        customerId : createOrderDto.customerId,
        status: createOrderDto.status,
        paymentStatus: createOrderDto.paymentStatus,
        total: createOrderDto.total,
        tenantId: createOrderDto.tenantId,
        items: {
          create: createOrderDto.items
        },

      }
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({where:{id}});
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...(updateOrderDto.customerId && { customerId: updateOrderDto.customerId }),
        ...(updateOrderDto.status && { status: updateOrderDto.status }),
        ...(updateOrderDto.paymentStatus && { paymentStatus: updateOrderDto.paymentStatus }),
        ...(updateOrderDto.total && { total: updateOrderDto.total}),
        ...(updateOrderDto.tenantId && { tenantId: updateOrderDto.tenantId }),
      }
    })
  }

  remove(id: string) {
    return this.prisma.order.delete({
      where : {id}
    });
  }
}
