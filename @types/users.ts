import { Role, User as PrismaUser } from '@prisma/client'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role,
  createdAt: Date
  updatedAt: Date
}

export type ManagerForTable = PrismaUser & {
  clientsCount: number;
};