import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { getClients } from '@/utils/getClients';

export async function GET() {
  try {
    const clients = await getClients();
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newClient = await prisma.client.create({
      data: {
        name: body.name,
        company: body.company,
        routePlan: body.routePlan,
        fixedPlan: body.fixedPlan,
        status: body.status || 'Ativo',
        serverId: body.serverId,
        managerId: body.managerId,
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Erro na rota POST /api/client:", error);
    return NextResponse.json({ error: 'Não foi possível criar o cliente' }, { status: 500 });
  }
}