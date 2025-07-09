import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { getServers } from '@/utils/getServers';

export async function GET() {
  try {
    const servers = await getServers();
    return NextResponse.json(servers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch servers' }, { status: 500 });
  }
}

export async function POST( request: Request ) {
  try {
    const body = await request.json();

    if ( body.ip.length < 7 ) {
      throw new Error('IP do servidor deve ser maior que sete dígitos')
    }

    const newServer = await prisma.server.create({
      data: {
        name: body.name,
        ip: body.ip,
        status: body.status,
      },
    });

    return NextResponse.json(newServer, { status: 201 });
  } catch (error) {
    console.error("Erro na rota POST /api/servers:", error);
    return NextResponse.json({ error: 'Não foi possível criar o servidor' }, { status: 500 });
  }
}