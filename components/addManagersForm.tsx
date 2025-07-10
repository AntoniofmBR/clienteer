"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Input } from "./input";
import { Button } from "./button";

async function postManger( formData: FormData ) {
  const res = await fetch('/api/managers', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { 'Content-Type': 'application/json' },
  });

  if ( !res.ok ) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Falha ao criar o cliente');
  }
  return res.json();
}

export function AddManagerForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postManger,
    onSuccess: () => {
      toast.success('Gerente adicionado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['managers'] });
      onClose();
    },
    onError: ( err ) => {
      toast.error( err.message )
    },
  });

  function handleSubmit( event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();
    const formData = new FormData( event.currentTarget );
    mutation.mutate( formData );
  };


  return (
    <form onSubmit={ handleSubmit } className="space-y-4">
      <section className="flex items-center justify-center gap-2" >
        <Input name="name" label="Nome do Gerente:" placeholder="Nome" required />
        <Input name="email" label="Email:" placeholder="fulano@email.com" required />
      </section>

      <Input name='password' label='Senha:' placeholder='123' required />

      <Button type="submit" disabled={ mutation.isPending }>
        { mutation.isPending ? "Salvando..." : "Salvar Gerente" }
      </Button>
    </form>
  );
}