'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ServerForTable } from '@/@types/servers';
import { ServerStatus } from '@/lib/generated/prisma';

import { Input } from './input';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type ServerUpdateData = Omit<ServerForTable, 'id' | 'createdAt' | 'updatedAt' | 'totalClients'>

async function updateServerMutationFn({ id, ...data }: { id: string } & Partial<ServerUpdateData>) {
  const response = await fetch(`/api/servers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if ( !response.ok ) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao atualizar o servidor');
  }
  return response.json();
}

export function EditServerForm({ server, onSuccess, onCancel }: {
  server: ServerForTable;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateServerMutationFn,
    onSuccess: () => {
      toast.success('Servidor atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['servers'] });
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
    
    mutation.mutate({ id: server.id, ...data });
  };

  return (
    <form onSubmit={ handleSubmit } className="space-y-4">
      <section className="grid grid-cols-2 gap-4">
        <Input name="name" label="Nome do Servidor:" defaultValue={ server.name } required />
        <Input name="ip" label="Endereço de IP:" defaultValue={ server.ip } required />
      </section>

      <section>
        <div>
          <label className='text-lg font-bold text-foreground mb-2 block'>Status:</label>
          <Select name="status" defaultValue={ server.status } required >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ ServerStatus.FUNCIONANDO }>Funcionando</SelectItem>
              <SelectItem value= { ServerStatus.INOPERANTE }>Inoperante</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      
      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={ onCancel } className="w-full">
          Cancelar
        </Button>
        <Button type="submit" disabled={ mutation.isPending } className="w-full">
          { mutation.isPending ? "Salvando..." : "Atualizar Servidor" }
        </Button>
      </div>
    </form>
  );
}