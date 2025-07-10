import prisma from '@/lib/prisma';
import { ManagerForTable } from '@/@types/users';
import { Role } from '@prisma/client';

export async function getManagers(): Promise<ManagerForTable[]> {
  const managersFromDb = await prisma.user.findMany({
    where: {
      role: Role.MANAGER,
    },
    include: {
      _count: {
        select: {
          clientsManaged: true,
        },
      },
    },
  });

  const formattedManagers = managersFromDb.map((manager) => ({
    ...manager,
    clientsCount: manager._count.clientsManaged,
  }));

  return formattedManagers;
}