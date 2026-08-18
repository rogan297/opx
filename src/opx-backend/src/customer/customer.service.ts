import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {

  constructor(private prisma: PrismaService){}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        name: createCustomerDto.name,
        tenant: {
          connect: { id: createCustomerDto.tenantId } 
        }
      }
    });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id }
    });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({
      where: { id }
    });
  }
}
