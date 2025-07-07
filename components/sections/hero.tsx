'use client'

import { FormEvent } from 'react';
import { Envelope, LockKey } from 'phosphor-react';

import { Input } from '@/components/input';
import { Button } from '../button';

export function HeroSection() {
  function handleSubmit( e: FormEvent<HTMLFormElement> ) {
    e.preventDefault()
    return alert('Entrou')
  }

  return (
    <nav className='min-h-screen md:h-screen flex flex-col gap-4 md:gap-16 w-full justify-center items-center' >
      <h1 className='text-2xl mt-12 md:text-6xl font-bold text-center' >
        Visualize os seus clientes e servidores <br /> <span className='text-green' > em um só lugar </span>
      </h1>
      <form
        className='bg-cards-primary h-fit w-fit md:min-w-1/3 md:max-w-5/6 flex flex-col gap-4 items-center justify-center rounded-lg py-7 px-4 md:px-7'
        onSubmit={ ( e ) => handleSubmit( e ) }
      >
        <Input
          label='Email:'
          placeholder='Email'
          type='email'
          icon={ Envelope }
          required
        />
        <Input
          label='Senha:'
          placeholder='Senha'
          type='password'
          icon={ LockKey }
          required
        />
        <Button
          className='text-xl'
          type='submit'
        >
          Login
        </Button>
      </form>
    </nav>
  )
}