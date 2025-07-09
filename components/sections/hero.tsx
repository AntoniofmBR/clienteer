'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Envelope, LockKey } from 'phosphor-react';
import { toast } from 'sonner';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

export function HeroSection() {
  const router = useRouter();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if ( result?.error ) {
        setIsLoading(false);
        toast.error('Um erro ocorreu, verifique seus dados e tente novamente!')
      } else {
        router.push('/clients');
      }
    } catch ( err ) {
      setIsLoading(false);
      toast.error( 'Um erro ocorreu ao entrar, por favor tente novamente mais tarde!')

    }
  }

  return (
    <nav className='min-h-screen md:h-screen flex flex-col gap-4 md:gap-16 w-full justify-center items-center'>
      <h1 className='text-2xl mt-12 lg:text-4xl font-bold text-center'>
        Visualize os seus clientes e servidores <br /> <span className='text-green'>em um só lugar</span>
      </h1>
      <form
        className='bg-cards-primary h-fit w-fit md:min-w-1/3 md:max-w-5/6 flex flex-col gap-4 items-center justify-center rounded-lg py-7 px-4 md:px-7'
        onSubmit={ handleSubmit }
      >
        <Input
          label='Email:'
          placeholder='Email'
          type='email'
          icon={Envelope}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label='Senha:'
          placeholder='Senha'
          type='password'
          icon={LockKey}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className='text-xl mt-2' type='submit' disabled={ isLoading } >
          { isLoading ? 'Entrando...' : 'Login' }
        </Button>
      </form>
    </nav>
  );
}