'use client'

import { useState } from 'react';
import { User as UserIcon, Warning } from 'phosphor-react';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';

import { UserForm } from './userForm';

interface SettingsFormProps {
  user: {
    id: string
    name: string
    email: string
  };
  userRole: string
}


export function SettingsForm({ user, userRole }: SettingsFormProps ) {
  const [ about, setNewAbout ] = useState('');
  const [ message, setNewMessage ] = useState('');

  function handleSendMessage( event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault()
    setNewAbout('')
    setNewMessage('')
    return toast.message('Mensagem enviada com sucesso!')
  }

  return (
    <div className='flex gap-2'>
      <section className='w-1/2 bg-cards-primary rounded-lg p-7 flex flex-col items-center justify-between'>
        <div className='flex items-center gap-2'>
          <UserIcon size={ 37 } weight='fill' />
          <h2 className='text-2xl font-semibold'> Perfil </h2>
        </div>
        <UserForm user={ user } />
      </section>
      { userRole === 'MANAGER' && (
        <section className='w-1/2 bg-cards-primary rounded-lg p-7 flex flex-col items-center justify-center' >
          <div className='flex items-center gap-2' >
            <Warning size={ 37 } weight='fill' />
            <h2 className='text-2xl font-semibold' >
              Relatar Problema
            </h2>
          </div>
          <form onSubmit={ handleSendMessage } className='flex flex-col gap-2 w-[70%] mt-3' >
            <Input
              label='Sobre:'
              value={ about }
              onChange={ ( e ) => setNewAbout( e.target.value ) }
              required
            />
            <Textarea
              label='Mensagem:'
              value={ message }
              onChange={ ( e ) => setNewMessage( e.target.value ) }
              required
            />
            <Button>
              Enviar Mensagem
            </Button>
          </form>
        </section>
      ) }
    </div>
  );
}