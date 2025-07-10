import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const { id, ...dataToUpdate } = await request.json();

    if ( !id ) {
      return NextResponse.json({ error: 'O ID do cliente é obrigatório para a atualização.' }, { status: 400 });
    }

    const updatedClient = await prisma.client.update({
      where: { id: id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return NextResponse.json({ error: 'Falha ao atualizar o cliente' }, { status: 500 });
  }
}