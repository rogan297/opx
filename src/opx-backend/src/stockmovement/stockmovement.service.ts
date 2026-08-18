import { Injectable } from '@nestjs/common';
import { CreateStockmovementDto } from './dto/create-stockmovement.dto';
import { UpdateStockmovementDto } from './dto/update-stockmovement.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockmovementService {

  constructor(private prisma : PrismaService){}

  async create(createStockmovementDto: CreateStockmovementDto) {
  const { inventoryId, quantity, type, ...rest } = createStockmovementDto;

  // Calculamos cuánto sumar o restar
  // OUTPUT y PRODUCTION_INPUT restan stock
  // INPUT y PRODUCTION_OUTPUT suman stock
  const stockChange = (type === 'OUTPUT' || type === 'PRODUCTION_INPUT') 
    ? -quantity 
    : quantity;

  return this.prisma.$transaction(async (tx) => {
    // 1. Creamos el registro del movimiento
    const movement = await tx.stockMovement.create({
      data: {
        inventoryId,
        quantity,
        type,
        ...rest,
      },
    });

    // 2. Actualizamos el stock actual en la tabla Inventory
    await tx.inventory.update({
      where: { id: inventoryId },
      data: {
        quantityAvailable: {
          increment: stockChange, // Prisma maneja la suma/resta atómica
        },
      },
    });

    return movement;
  });
}

  findAll() {
    return this.prisma.stockMovement.findMany();
  }

  findOne(id: string) {
    return this.prisma.stockMovement.findUnique({
      where : {id}
    });
  }

  update(id: string, updateStockmovementDto: UpdateStockmovementDto) {
    return this.prisma.stockMovement.update({
      where: {id},
      data: {...updateStockmovementDto}
    });
  }

  async findByInventoryId(inventoryId: string) {
    return this.prisma.stockMovement.findMany({
      where: { inventoryId },
      orderBy: { createdAt: 'desc' },
    });
  }

  remove(id: string) {
    return this.prisma.stockMovement.delete({where:{id}});
  }
}
