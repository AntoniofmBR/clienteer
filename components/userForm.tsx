'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { IdentificationCard, Envelope, LockKey } from 'phosphor-react';
import { useSession } from 'next-auth/react';

import { Button } from './button';
import { Input } from './input';

interface UserUpdatePayload {
  name?: string;
  email?: string;
  password?: string;
}

async function updateUserMutationFn({ id, ...data }: { id: string } & UserUpdatePayload) {
  const response = await fetch( '/api/user/update', {
    method: 'PATCH',
    body: JSON.stringify({ id, ...data }),
    headers: { 'Content-Type': 'application/json' },
  });

  if ( !response.ok ) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao atualizar o usuário');
  }
  return response.json();
}

export function UserForm({ user }: { user: { id: string; name: string; email: string; } }) {
  const queryClient = useQueryClient();
  const { data: session, update: updateSession } = useSession()

  const [ name, setName ] = useState(user.name);
  const [ email, setEmail ] = useState(user.email);
  const [ newPassword, setNewPassword ] = useState('');

  const mutation = useMutation({
    mutationFn: updateUserMutationFn,
    onSuccess: ( updatedUserData ) => {
      toast.success('Seu perfil foi atualizado com sucesso!');
      
      updateSession({
        name: updatedUserData.name,
        email: updatedUserData.email,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  function handleSubmit( event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();

    const payload: UserUpdatePayload = {
      name: name,
      email: email,
    };

    if ( newPassword.trim() !== '' ) {
      payload.password = newPassword;
    }
    
    mutation.mutate({ id: user.id, ...payload });
  };

  return (
    <form onSubmit={ handleSubmit } className='flex flex-col gap-2 w-[70%] justify-center items-center mt-3'>
      <Input
        value={ name }
        onChange={ ( e ) => setName( e.target.value ) }
        icon={ IdentificationCard }
        label='Nome:'
        type='text'
      />
      <Input
        value={ email }
        onChange={ ( e ) => setEmail( e.target.value ) }
        icon={ Envelope }
        label='Email:'
        type='email'
      />
      <Input
        value={ newPassword }
        onChange={ ( e ) => setNewPassword( e.target.value ) }
        icon={ LockKey }
        label='Nova Senha:'
        placeholder='Deixe em branco para não alterar'
        type='password'
      />
      <Button type='submit' disabled={ mutation.isPending }>
        { mutation.isPending ? 'Atualizando...' : 'Atualizar Perfil' }
      </Button>
    </form>
  )
}