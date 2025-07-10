import { Client as PrismaClient } from '@prisma/client';

export type ClientForTable = PrismaClient & {
  server: string;
  managerName: string;
};

export interface Client {
  id: string;
  name: string;
  company: string;
  routePlan: string;
  fixedPlan: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  serverId: string;
  managerId: string;
  userAccountId: string; 

  server: string;
  manager: string;
}