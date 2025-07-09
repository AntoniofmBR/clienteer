import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    const updatedClient = await prisma.client.update({
      where: { id: id },
      data: body,
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao atualizar o cliente' }, { status: 500 });
  }
}