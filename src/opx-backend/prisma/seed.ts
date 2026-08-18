import { PrismaClient, SectorEnum, StepCategory } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as argon2 from 'argon2';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedSystemActions() {
  const systemActions = [
    { name: 'PREPARE', category: StepCategory.ACTION, icon: 'Play' },
    { name: 'COOK', category: StepCategory.ACTION, icon: 'Flame' },
    { name: 'ASSEMBLE', category: StepCategory.ACTION, icon: 'Wrench' },
    { name: 'FRY', category: StepCategory.ACTION, icon: 'Flame' },
    { name: 'GRILL', category: StepCategory.ACTION, icon: 'Flame' },
    { name: 'PACK', category: StepCategory.ACTION, icon: 'Package' },
    { name: 'EXPEDITE', category: StepCategory.ACTION, icon: 'Send' },
    { name: 'CUT', category: StepCategory.ACTION, icon: 'Scissors' },
    { name: 'WELD', category: StepCategory.ACTION, icon: 'Zap' },
    { name: 'INSPECT', category: StepCategory.ACTION, icon: 'Search' },
    { name: 'PAINT', category: StepCategory.ACTION, icon: 'Paintbrush' },
    { name: 'TEST', category: StepCategory.ACTION, icon: 'Beaker' },
    { name: 'CONDITION', category: StepCategory.LOGIC, icon: 'GitBranch' },
    { name: 'DELAY', category: StepCategory.LOGIC, icon: 'Clock' },
    { name: 'TRANSFORM', category: StepCategory.TRANSFORM, icon: 'Shuffle' },
  ];

  for (const action of systemActions) {
    const existing = await prisma.actionType.findFirst({
      where: { name: action.name, isSystem: true, tenantId: null },
    });
    if (!existing) {
      await prisma.actionType.create({
        data: { ...action, isSystem: true, tenantId: null },
      });
    }
  }

  console.log(`✅ ${systemActions.length} system action types created`);
}

async function seedFoodServiceTenant() {
  const tenant = await prisma.tenant.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Café & Padaria',
      sector: SectorEnum.FOOD_SERVICE,
      config: {
        vocabulary: {
          workstation: 'Estação de Cozinha',
          operator: 'Cozinheiro',
          rawMaterial: 'Insumo',
          product: 'Produto',
          productionOrder: 'Ordem de Produção',
        },
        enabledModules: [
          'dashboard', 'pdv', 'products', 'stock', 'production',
          'stations', 'workflows', 'employees', 'inventory',
          'maintenance', 'metrics', 'standards',
        ],
        currency: 'BRL',
      },
    },
  });

  // Create stations
  const stations = [
    { name: 'Cafeteira', description: 'Preparo de cafés especiais' },
    { name: 'Forno', description: 'Assamento de pães e salgados' },
    { name: 'Montagem', description: 'Montagem de pratos e lanches' },
    { name: 'Bebidas Frias', description: 'Preparo de sucos e bebidas geladas' },
    { name: 'Finalização', description: 'Embalagem e finalização' },
  ];
  for (const s of stations) {
    await prisma.station.create({
      data: { ...s, tenantId: tenant.id, currentLoad: 0, isActive: true },
    });
  }

  console.log(`✅ Food service tenant created: ${tenant.name}`);
}

async function seedManufacturingTenant() {
  const tenant = await prisma.tenant.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Metalúrgica Modelo',
      sector: SectorEnum.MANUFACTURING,
      config: {
        vocabulary: {
          workstation: 'Posto de Trabalho',
          operator: 'Operador',
          rawMaterial: 'Matéria-Prima',
          product: 'Componente',
          productionOrder: 'Ordem de Fabricação',
        },
        enabledModules: [
          'dashboard', 'products', 'stock', 'production',
          'stations', 'workflows', 'employees', 'inventory',
          'maintenance', 'metrics', 'standards',
        ],
        currency: 'BRL',
      },
    },
  });

  // Create manufacturing stations
  const stations = [
    { name: 'Corte Plasma', description: 'Corte de chapas de aço' },
    { name: 'Montagem', description: 'Montagem de estruturas' },
    { name: 'Solda MIG', description: 'Soldagem MIG/MAG' },
    { name: 'Inspeção', description: 'Inspeção de qualidade' },
    { name: 'Pintura', description: 'Pintura industrial' },
    { name: 'Teste', description: 'Teste de estanqueidade' },
  ];
  for (const s of stations) {
    await prisma.station.create({
      data: { ...s, tenantId: tenant.id, currentLoad: 0, isActive: true },
    });
  }

  console.log(`✅ Manufacturing tenant created: ${tenant.name}`);
}

async function main() {
  const hashedPassword = await argon2.hash('admin');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  await seedSystemActions();
  await seedFoodServiceTenant();
  await seedManufacturingTenant();

  console.log('✅ Seed completado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Error no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
