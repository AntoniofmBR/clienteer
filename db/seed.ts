import bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';
import { usersData, serversData, clientsData } from '@/data';


const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o processo de seed em massa...');

  console.log('🧹 Limpando dados existentes...');
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
  await prisma.server.deleteMany();

  //! Users
  console.log(`👤 Criptografando senhas e preparando ${ usersData.length } usuários...`);
  const createdUsersData = await Promise.all(
    usersData.map(async ( user ) => ({
      ...user,
      password: await bcrypt.hash( user.password, 10),
    }))
  );
  await prisma.user.createMany({ data: createdUsersData });
  console.log('👥 Usuários criados.');

  //! Servers
  console.log(`🖥️ Preparando ${ serversData.length } servidores...`);
  await prisma.server.createMany({ data: serversData });
  console.log('💻 Servidores criados.');


  //? Mapping
  console.log('🗺️ Mapeando IDs de usuários e servidores para consulta em memória...');
  const usersInDb = await prisma.user.findMany();
  const serversInDb = await prisma.server.findMany();

  const userMap = new Map(usersInDb.map((user) => [ user.email, user.id ]));
  const serverMap = new Map(serversInDb.map((server) => [server.name, server.id]));
  console.log('🗺️ Mapeamento concluído.');

  console.log(`🧑‍🤝‍🧑 Preparando ${clientsData.length} clientes com suas relações...`);
  const preparedClientsData = clientsData.map((client) => {
    const managerId = userMap.get(client.managerEmail);
    const serverId = serverMap.get(client.serverName);

    if (!managerId || !serverId) {
      throw new Error(`Não foi possível encontrar o gerente ou servidor para o cliente: ${client.name}`);
    }

    const { managerEmail, serverName, ...clientData } = client;
    return {
      ...clientData,
      managerId,
      serverId,
    };
  });

  //! Inserting
  await prisma.client.createMany({
    data: preparedClientsData,
  });
  console.log(`✅ ${preparedClientsData.length} clientes criados com sucesso!`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o processo de seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🌱 Processo de seed finalizado.');
  });