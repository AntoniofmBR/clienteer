import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export async function PATCH( request: Request, { params }: { params: { id: string } } ) {
  try {
    const id = params.id;
    const body = await request.json();

    if ( body.password ) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: body,
    });
    
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error("Erro na rota POST /api/servers:", error);
    return NextResponse.json({ error: 'Não foi possível criar o servidor' }, { status: 500 });
  }
}