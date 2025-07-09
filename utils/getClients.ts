import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/lib/prisma';
import { ClientForTable } from '@/@types/clients';

export async function getClients(): Promise<ClientForTable[]> {
  noStore()
  const clientsFromDb = await prisma.client.findMany({
    include: {
      manager: {
        select: { name: true },
      },
      server: {
        select: { name: true },
      },
    },
  });

  const formattedClients: ClientForTable[] = clientsFromDb.map((client) => {
    const managerName = client.manager?.name || 'Gerente não atribuído';
    const serverName = client.server?.name || 'Servidor não atribuído';

    const { manager, server, ...clientData } = client;

    return {
      ...clientData,
      managerName: managerName,
      server: serverName,
    };
  });

  return formattedClients;
}