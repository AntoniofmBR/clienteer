import Image from 'next/image';

import logo from '@/public/logo.png'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center md:justify-between items-center px-16 py-12 bg-transparent backdrop-blur">
      <Image
        src={ logo }
        alt='Logo Clienteer'
        height={ 200 }
        width={ 200 }
        className='hover:scale-110 transition-all'
        priority
      />

      <div className='hidden md:flex md:items-center md:justify-center md:text-md md:gap-7' >
        <a href='#hero' className='hover:scale-110 transition-all ' >
          Home
        </a>
        <a href='#about' className='hover:scale-110 transition-all ' >
          Sobre
        </a>
        <a href='#questions' className='hover:scale-110 transition-all ' >
          Perguntas
        </a>
      </div>
    </header>
  )
}