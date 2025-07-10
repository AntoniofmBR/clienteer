import { Server as PrismaServer, ServerStatus } from '@prisma/client';

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