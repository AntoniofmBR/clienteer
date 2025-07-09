"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Input } from "./input";
import { Button } from "./button";

async function postServer( formData: FormData ) {
  const response = await fetch('/api/servers', {
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

export function AddServerForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postServer,
    onSuccess: () => {
      toast.success('Servidor adicionado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['servers'] });
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
        <Input name="name" label="Nome do Servidor:" placeholder="Nome" required />
        <Input name="ip" label="Ip do Servidor:" placeholder="000.000.000" required />
      </section>
      <Button type="submit" disabled={ mutation.isPending }>
        { mutation.isPending ? "Salvando..." : "Salvar Servidor" }
      </Button>
    </form>
  );
}