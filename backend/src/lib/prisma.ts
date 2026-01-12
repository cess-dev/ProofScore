import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

let prisma: PrismaClient;

try {
  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error', 'warn'],
    });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }

  // Test connection on startup (non-blocking)
  prisma.$connect().catch((err) => {
    logger.warn({ err }, 'Failed to connect to database. Some features may be unavailable.');
  });
} catch (error: any) {
  logger.error({ err: error }, 'Failed to initialize Prisma Client. Run: npx prisma generate');
  // Create a mock Prisma client that throws helpful errors
  prisma = {} as PrismaClient;
  throw new Error(
    'Prisma Client not generated. Please run: npx prisma generate\n' +
    'Or run the startup script: ./start.sh'
  );
}

export { prisma };

