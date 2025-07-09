import { Server as PrismaServer, ServerStatus } from '@/lib/generated/prisma';

export type ServerForTable = PrismaServer & {
  totalClients: number;
};

export interface Server {
  id: string
  name: string
  ip: string
  status: ServerStatus
  createdAt: Date
  updatedAt: Date
}