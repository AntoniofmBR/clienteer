import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    const updatedManager = await prisma.user.update({
      where: { id: id },
      data: body,
    });

    return NextResponse.json(updatedManager);
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao atualizar o cliente' }, { status: 500 });
  }
}