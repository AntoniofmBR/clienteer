import prisma from '@/lib/prisma';
import { ServerForTable } from '@/@types/servers'

export async function getServers(): Promise<ServerForTable[]> {
  const serversFromDb = await prisma.server.findMany({
    include: {
      _count: {
        select: { 
          clients: true
        },
      },
    },
  });

  const formattedServers: ServerForTable[] = serversFromDb.map(server => {
    return {
      ...server,
      totalClients: server._count.clients,
    };
  });

  return formattedServers;
}