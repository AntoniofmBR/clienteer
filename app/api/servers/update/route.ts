import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const { id, ...dataToUpdate } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'O ID do servidor é obrigatório.' }, { status: 400 });
    }

    const updatedServer = await prisma.server.update({
      where: { id: id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.error("Erro ao atualizar servidor:", error);
    return NextResponse.json({ error: 'Falha ao atualizar o servidor.' }, { status: 500 });
  }
}