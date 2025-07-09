'use server';

import { revalidatePath } from 'next/cache';

import { signOut } from '@/auth';
import prisma from './prisma';

interface ClientFormData {
  name: string;
  company: string;
  routePlan: string;
  fixedPlan: string;
  status: string;
  serverId: string;
  managerId: string;
}

interface ServerFOrmData {
  
}

interface ManagerFormData {
  
}

export async function handleLogout() {
  await signOut({
    redirectTo: '/',
  });
}

type FormState = { error?: string; success?: string; };

export async function addClient( prevState: FormState | null, formData: FormData): Promise<FormState> {
  const data: ClientFormData = {
    name: formData.get('name') as string,
    company: formData.get('company') as string,
    routePlan: formData.get('routePlan') as string,
    fixedPlan: formData.get('fixedPlan') as string,
    status: formData.get('status') as string,
    serverId: formData.get('serverId') as string,
    managerId: formData.get('managerId') as string,
  };

  if (!data.name || !data.company || !data.serverId || !data.managerId) {
    return { error: 'Campos obrigatórios estão faltando.' };
  }

  try {
    await prisma.client.create({
      data: {
        ...data,
        status: 'Ativo'
      },
    });

    revalidatePath('/clients'); //? buscar novamente os dados para atualizar a tabela

    return { success: 'Cliente adicionado com sucesso!' };
  } catch ( err ) {
    console.error('Erro ao adicionar cliente:', err);
    return { error: 'Não foi possível adicionar o cliente.' };
  }
}

export async function updateClient( prevState: FormState | null, formData: FormData ): Promise<FormState> {
  const id = formData.get('id') as string;

  const newData = {
    name: formData.get('name') as string,
    company: formData.get('company') as string,
    routePlan: formData.get('routePlan') as string,
    fixedPlan: formData.get('fixedPlan') as string,
    status: formData.get('status') as string,
    serverId: formData.get('serverId') as string,
    managerId: formData.get('managerId') as string,
  };

  if (!id) {
    return { error: 'ID do cliente não encontrado. Não é possível atualizar.' };
  }

  const existingClient = await prisma.client.findUnique({
      where: { id },
  });

  if (
    existingClient &&
    existingClient.name === newData.name &&
    existingClient.company === newData.company &&
    existingClient.routePlan === newData.routePlan &&
    existingClient.fixedPlan === newData.fixedPlan &&
    existingClient.status === newData.status &&
    existingClient.serverId === newData.serverId &&
    existingClient.managerId === newData.managerId
  ) {
    return { error: 'Nenhum dado foi alterado, por favor insira dados novos para que esse cliente seja atualizado!' };
  }

  try {
    await prisma.client.update({
      where: {
        id,
      },
      data: newData,
    });

    revalidatePath('/clients');

    return { success: 'Cliente atualizado com sucesso!' };

  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return { error: 'Não foi possível atualizar o cliente.' };
  }
}