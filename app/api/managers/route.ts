import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { Role } from '@/lib/generated/prisma';

import { getManagers } from '@/utils/getManagers';

export async function GET() {
  try {
    const managers = await getManagers();
    return NextResponse.json(managers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch managers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newManager = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: Role.MANAGER,
      },
    });

    return NextResponse.json(newManager, { status: 201 });
  } catch (error) {
    console.error("Erro na rota POST /api/managers:", error);
    return NextResponse.json({ error: 'Não foi possível criar o gerente' }, { status: 500 });
  }
}