'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

import logo from '@/public/logo.png'

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen' >
      <Image
        src={ logo }
        height={ 200 }
        width={ 200 }
        alt='Clienteer Logo'
        priority
      />
      <div className="p-6 rounded-lg-shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          404 Não encontrado
        </h1>
        <p className="text-gray">
          Parece que a página que você esta tentando acessar, não existe ou foi removida. Tente novamente mais tarde
        </p>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={ () => ( window.location.href = '/' ) }
        >
          Voltar para tela inicial
        </Button>
      </div>
    </div>
  )
}