import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {

  constructor(private prisma : PrismaService){}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        description: createProductDto.description,
        inventory: {
        create: {
          quantityAvailable: 0,
          minThreshold: 5,
        }
      },
        tenant: {
          connect: {id: createProductDto.tenantId}
        }
      }
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where : {id},
      include: {
    tenant: true,
    inventory: true 
  }});
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        price: updateProductDto.price ? new Prisma.Decimal(updateProductDto.price) : undefined
      } as Prisma.ProductUncheckedUpdateInput 
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where : { id }});
  }
}
