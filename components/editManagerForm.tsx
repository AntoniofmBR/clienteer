'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { ManagerForTable } from '@/@types/users';
import { Role } from '@prisma/client';

import { Input } from './input';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type ManagerUpdateData = Partial<Omit<ManagerForTable, 'id' | 'createdAt' | 'updatedAt' | 'clientsCount'>>;
type ManagerUpdatePayload = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
};

async function updateManagerMutationFn( payload: ManagerUpdatePayload ) {
  const response = await fetch('/api/user/update', {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao atualizar o gerente');
  }
  return response.json();
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={ pending } className="w-full">
      { pending ? "Salvando..." : "Atualizar Gerente" }
    </Button>
  );
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    mutation.mutate({ id: manager.id, ...data });
  };

  return (
    <form onSubmit={ handleSubmit } className="space-y-4">
      <section className="grid grid-cols-2 gap-4">
        <Input name="name" label="Nome do Gerente:" defaultValue={ manager.name } required />
        <Input name="email" label="Email:" defaultValue={ manager.email } type="email" required />
      </section>

      <section>
        <label className='text-lg font-bold text-foreground mb-2 block'>Função (Role):</label>
        <Select name="role" defaultValue={ manager.role } required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ Role.MANAGER }>Gerente</SelectItem>
            <SelectItem value={ Role.ADMIN }>Admin</SelectItem>
          </SelectContent>
        </Select>
      </section>
      
      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={ onCancel } className="w-full">
          Cancelar
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}