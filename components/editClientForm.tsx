'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ClientForTable } from '@/@types/clients';

import { Input } from './input';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useFormStatus } from 'react-dom';

type Manager = { id: string; name: string };
type Server = { id: string; name: string };

type ClientUpdateData = {
  id: string;
  name?: string;
  company?: string;
  routePlan?: string;
  fixedPlan?: string;
  status?: string;
  serverId?: string;
  managerId?: string;
};

async function updateClientMutationFn(data: ClientUpdateData) {
  const response = await fetch(`/api/clients/update`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao atualizar o cliente');
  }
  return response.json();
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={ pending } className="w-full">
      { pending ? "Salvando..." : "Atualizar Cliente" }
    </Button>
  );
}

export function EditClientForm({ client, managers, servers, onSuccess, onCancel }: {
  client: ClientForTable;
  managers: Manager[];
  servers: Server[];
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateClientMutationFn,
    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
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

    mutation.mutate({ id: client.id, ...data });
  };

  return (
    <form onSubmit={ handleSubmit } className="space-y-4">
      <section className="flex items-center justify-center gap-4">
        <Input name="name" label="Nome do Cliente:" defaultValue={client.name} required />
        <Input name="company" label="Empresa:" defaultValue={client.company} required />
      </section>

      <section className="grid grid-cols-2 gap-4 w-full">
        <div>
          <label className='text-lg font-bold text-foreground mb-2 block'>Gerente:</label>
          <Select name="managerId" defaultValue={client.managerId} required>
            <SelectTrigger><SelectValue placeholder="Selecione um gerente" /></SelectTrigger>
            <SelectContent>
              {managers.map(manager => (
                <SelectItem key={manager.id} value={manager.id}>{manager.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='text-lg font-bold text-foreground mb-2 block'>Servidor:</label>
          <Select name="serverId" defaultValue={client.serverId} required>
            <SelectTrigger><SelectValue placeholder="Selecione um servidor" /></SelectTrigger>
            <SelectContent>
              {servers.map(server => (
                <SelectItem key={server.id} value={server.id}>{server.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>
      
      <section className="grid grid-cols-3 gap-4 w-full items-end">
        <Input name="routePlan" label="Plano de Rota:" defaultValue={client.routePlan} required />
        <Input name="fixedPlan" label="Plano Fixo:" defaultValue={client.fixedPlan} required />
        <div>
          <label className='text-lg font-bold text-foreground mb-2 block'>Status:</label>
          <Select name="status" defaultValue={client.status} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Bloqueado">Bloqueado</SelectItem>
            </SelectContent>
          </Select>
        </div>
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