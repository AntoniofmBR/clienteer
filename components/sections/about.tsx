import Image from 'next/image';

import { Card } from '@/components/card'

import illustration from '@/public/illustration.png'
import { cards } from '@/utils/constants';

export function AboutSection() {
  return (
    <nav className='min-h-screen py-4 flex gap-7 w-full justify-between items-center' >
      <section className='hidden md:flex md:w-1/2' >
        <Image
          src={ illustration }
          alt='Illustration'
          className='h-9/12 w-9/12 hover:scale-105 transition-all'
          priority
        />
      </section>
      <section className='text-center w-full md:text-left md:w-1/2' >
        <div className='flex flex-col gap-1 mb-12' >
          <p className='text-sm md:text-lg text-green' >
            Sobre
          </p>
          <h2 className='text-2xl md:text-5xl font-bold' >
            Gerencie seus clientes de forma prática e eficiente
          </h2>
        </div>

        { cards.map( ( card, index ) => (
          <Card
            key={ `${ card.title }-${ index }` }
            title={ card.title }
            description={ card.description }
          />
        ) ) }
      </section>
    </nav>
  )
}