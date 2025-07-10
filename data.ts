import { Role, ServerStatus } from '@prisma/client';


export const usersData = [
  { name: 'Admin Geral', email: 'admin@email.com', password: 'admin123', role: Role.ADMIN },
  { name: 'Fulano', email: 'fulano@email.com', password: 'fulano123', role: Role.MANAGER },
  { name: 'Ciclano', email: 'ciclano@email.com', password: 'ciclano123', role: Role.MANAGER },
];

export const serversData = [
  { name: 'Athena', ip: '192.168.1.10', status: ServerStatus.FUNCIONANDO },
  { name: 'Gandalf', ip: '192.168.1.11', status: ServerStatus.FUNCIONANDO },
  { name: 'Rick', ip: '292.118.1.52', status: ServerStatus.INOPERANTE },
  { name: 'Alien', ip: '392.168.1.22', status: ServerStatus.FUNCIONANDO },
  { name: 'Kratos', ip: '522.166.2.32', status: ServerStatus.FUNCIONANDO },
  { name: 'Shrek', ip: '122.148.1.72', status: ServerStatus.INOPERANTE },
  { name: 'Zeus', ip: '342.123.3.42', status: ServerStatus.INOPERANTE },
  { name: 'Mario', ip: '212.265.7.16', status: ServerStatus.FUNCIONANDO },
  { name: 'Sonic', ip: '142.218.1.42', status: ServerStatus.INOPERANTE },
  { name: 'Xuxa', ip: '392.561.1.21', status: ServerStatus.FUNCIONANDO },
  { name: 'Zelda', ip: '292.261.6.19', status: ServerStatus.FUNCIONANDO },
  { name: 'Morty', ip: '152.178.1.18', status: ServerStatus.INOPERANTE },
];

export const clientsData = [
  { name: 'Neymar Jr.', company: '4net', routePlan: 'Vermelho', fixedPlan: 'Movel', status: 'Ativo', managerEmail: 'fulano@email.com', serverName: 'Athena' },
  { name: 'Cristiano Ronaldo', company: 'Oncall', routePlan: 'Roxo', fixedPlan: 'Movel', status: 'Bloqueado', managerEmail: 'ciclano@email.com', serverName: 'Xuxa' },
  { name: 'Lionel Messi', company: '4net', routePlan: 'Azul', fixedPlan: 'Fixo', status: 'Ativo', managerEmail: 'fulano@email.com', serverName: 'Rick' },
  { name: 'Ribamar', company: 'Oncall', routePlan: 'Verde', fixedPlan: 'Fixo', status: 'Ativo', managerEmail: 'fulano@email.com', serverName: 'Zeus' },
  { name: 'Jackcera', company: '4net', routePlan: 'Rosa', fixedPlan: 'Fixo', status: 'Bloqueado', managerEmail: 'ciclano@email.com', serverName: 'Mario' },
  { name: 'Paulinho', company: 'Oncall', routePlan: 'Ouro', fixedPlan: 'Fixo', status: 'Ativo', managerEmail: 'fulano@email.com', serverName: 'Sonic' },
  { name: 'Rony', company: '4net', routePlan: 'Verde', fixedPlan: 'Fixo', status: 'Ativo', managerEmail: 'ciclano@email.com', serverName: 'Shrek' },
  { name: 'Jonas', company: 'Oncall', routePlan: 'Laranja', fixedPlan: 'Fixo', status: 'Ativo', managerEmail: 'fulano@email.com', serverName: 'Alien' },
  { name: 'Ednaldo', company: '4net', routePlan: 'Branco', fixedPlan: 'Fixo', status: 'Ativo', managerEmail: 'ciclano@email.com', serverName: 'Zelda' },
  { name: 'Cléber', company: 'Oncall', routePlan: 'Especial', fixedPlan: 'Fixo', status: 'Ativo', managerEmail: 'fulano@email.com', serverName: 'Morty' },
];