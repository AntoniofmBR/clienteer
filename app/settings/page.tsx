'use client' //? Remover apos implementar backend

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Envelope, LockKey, User, Warning } from 'phosphor-react';

export default function SettingsPage() {
  return (
    <nav className='min-h-screen px-4 py-3 flex justify-between gap-4' >
      <main className='w-full mt-4 flex flex-col gap-2' >
        <h1 className='text-3xl font-bold' >
          Configurações
        </h1>
        <section className='h-1/2 w-full bg-cards-primary rounded-lg p-7 flex flex-col justify-between' >
          <div className='flex items-center gap-2' >
            <User size={ 37 } weight='fill' />
            <h2 className='text-2xl font-semibold' >
              Configurações de Perfil
            </h2>
          </div>
          <form className='flex flex-col gap-2 w-[30%] mt-3' >
            <Input
              placeholder='fulano@email.com'
              icon={ Envelope }
            />
            <Input
              placeholder='fulano@email.com'
              icon={ LockKey }
            />
            <Button>
              Atualizar Perfil
            </Button>
          </form>
          <div />
        </section>
        <section className='h-1/2 w-full bg-cards-primary rounded-lg p-7 flex flex-col justify-center' >
          <div className='flex items-center gap-2' >
            <Warning size={ 37 } weight='fill' />
            <h2 className='text-2xl font-semibold' >
              Relatar Problema
            </h2>
          </div>
          <form className='flex flex-col gap-2 w-[30%] mt-3' >
            <h3 className='text-lg -mt-1' >
              Sobre:
            </h3>
            <Input
              placeholder='fulano@email.com'
            />
            <h3 className='text-lg -mt-1' >
              Mensagem:
            </h3>
            <Textarea />
            <Button>
              Enviar Mensagem
            </Button>
          </form>
        </section>
      </main>
    </nav>
  )
}