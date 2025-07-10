import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST( request: Request ) {
  try {
    const { id } = await request.json();

    if ( !id ) {
      return NextResponse.json({ error: 'O ID do gerente é obrigatório.' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erro ao deletar gerente:", error);
    return NextResponse.json({ error: 'Falha ao deletar o gerente.' }, { status: 500 });
  }
}