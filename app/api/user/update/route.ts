import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const { id, ...dataToUpdate } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'O ID do usuário é obrigatório.' }, { status: 400 });
    }
    
    if (dataToUpdate.password) {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: dataToUpdate,
    });
    
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    return NextResponse.json({ error: 'Falha ao atualizar o usuário.' }, { status: 500 });
  }
}