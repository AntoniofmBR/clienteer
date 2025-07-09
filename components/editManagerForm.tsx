'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


import { Input } from './input';
import { Button } from './button';
import { ManagerForTable } from '@/@types/users';

type ManagerUpdateData = Omit<ManagerForTable, 'id' | 'createdAt' | 'updatedAt' >

async function updateManagerMutationFn({ id, ...data }: { id: string } & Partial<ManagerUpdateData>) {
  const response = await fetch(`/api/managers/${ id }`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if ( !response.ok ) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao atualizar o gerente');
  }
  return response.json();
}

export function EditManagerForm({ manager, onSuccess, onCancel }: {
  manager: ManagerForTable;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateManagerMutationFn,
    onSuccess: () => {
      toast.success('Gerente atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['managers'] });
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit( event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    mutation.mutate({ id: manager.id, ...data });
  };

  return (
    <form onSubmit={ handleSubmit } className="space-y-4">
      <section className="grid grid-cols-2 gap-4">
        <Input name="name" label="Nome do Servidor:" defaultValue={ manager.name } required />
        <Input name="email" label="Email:" defaultValue={ manager.email } required />
      </section>

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={ onCancel } className="w-full">
          Cancelar
        </Button>
        <Button type="submit" disabled={ mutation.isPending } className="w-full">
          { mutation.isPending ? "Salvando..." : "Atualizar Gerente" }
        </Button>
      </div>
    </form>
  );
}