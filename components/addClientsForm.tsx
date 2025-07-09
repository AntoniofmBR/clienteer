"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


import { Input } from "./input";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Manager = { id: string; name: string };
type Server = { id: string; name: string };

async function postClient( formData: FormData ) {
  const response = await fetch('/api/clients', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao criar o cliente');
  }
  return response.json();
}

export function AddClientForm({ managers, servers, onClose  }: { managers: Manager[]; servers: Server[], onClose: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postClient,
    onSuccess: () => {
      toast.success('Cliente adicionado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onClose();
    },
    onError: ( err ) => {
      toast.error( err.message )
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData( event.currentTarget );
    mutation.mutate( formData );
  };


  return (
    <form onSubmit={ handleSubmit } className="space-y-4">
      <section className="flex items-center justify-center gap-2" >
        <Input name="name" label="Nome do Cliente:" placeholder="Nome" required />
        <Input name="company" label="Empresa:" placeholder="4net/Oncall" required />
      </section>

      <section className="flex items-center justify-between gap-2 w-full" >
        <div>
          <label className='text-lg font-bold text-foreground mb-2 block' > Gerente Responsável: </label>
          <Select name="managerId" required>
            <SelectTrigger><SelectValue placeholder="Selecione um gerente" /></SelectTrigger>
            <SelectContent>
              { managers.map(manager => (
                <SelectItem key={ manager.id } value={ manager.id }>{ manager.name }</SelectItem>
              )) }
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='text-lg font-bold text-foreground mb-2 block' >Servidor:</label>
          <Select name="serverId" required>
            <SelectTrigger><SelectValue placeholder="Selecione um servidor" /></SelectTrigger>
            <SelectContent>
              { servers.map(server => (
                <SelectItem key={ server.id } value={ server.id }>{ server.name }</SelectItem>
              )) }
            </SelectContent>
          </Select>
        </div>
      </section>

      <Input name="routePlan" label="Plano de Rota:" placeholder="Verde" required />
      <Input name="fixedPlan" label="Plano Fixo:" placeholder="Movel" required />

      <Button type="submit" disabled={ mutation.isPending }>
        { mutation.isPending ? "Salvando..." : "Salvar Cliente" }
      </Button>
    </form>
  );
}