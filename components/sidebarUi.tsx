'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth'; 
import { Briefcase, Gear, HardDrives, SignOut, Users } from 'phosphor-react';
import { motion } from 'framer-motion';


import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton"

import logoShort from '@/public/shortLogo.png';
import { handleLogout } from '@/lib/actions';

function MotionIcon({ icon: Icon, isActive }: { icon: React.ElementType, isActive: boolean }) {
  return (
    <motion.div
      animate={{ color: isActive ? '#2D6A4F' : '#808080' }}
      transition={{ duration: 0.3 }}
    >
      <Icon size={ 40 } weight='fill' />
    </motion.div>
  );
}

export function SidebarUI() {
  const path = usePathname();
  const { data: session, status } = useSession();

  if ( status === 'loading' ) {
    return (
      <section className='flex flex-col justify-between items-center h-full rounded-lg py-7 bg-cards-primary px-12'>
      <Skeleton className="h-14 w-14 rounded-lg" />

      <div className='flex flex-col gap-4 w-full items-center justify-center'>
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>

      <Skeleton className="h-12 w-12 rounded-full" />
    </section>
    );
  }

  if ( !session ) {
    return null;
  }

  const user = session.user;

  const navLinks = [
    { href: '/clients', icon: Users, tooltip: 'Clientes' },
    { href: '/servers', icon: HardDrives, tooltip: 'Servidores' },
    { href: '/managers', icon: Briefcase, tooltip: 'Gerentes' },
    { href: '/settings', icon: Gear, tooltip: 'Configurações' },
  ];

  return (
    <TooltipProvider>
      <section className='flex flex-col justify-between items-center h-full rounded-lg py-7 bg-cards-primary px-2 md:px-12'>
        <Image
          src={ logoShort }
          alt='Logo Clienteer'
          className='max-w-14 h-fit w-fit '
          priority
        />

        <div className='flex flex-col gap-4 w-full items-center justify-center'>
          { navLinks.map((link) => {
            const isActive = path.includes(link.href);
            return (
              <Tooltip key={ link.href }>
                <TooltipTrigger asChild>
                  <Link href={ link.href }>
                    <MotionIcon icon={link.icon} isActive={ isActive } />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className='bg-cards-secondary text-green px-3 py-1 rounded-md font-semibold text-sm'>
                  <p>{ link.tooltip }</p>
                </TooltipContent>
              </Tooltip>
            );
          }) }
        </div>

        <Popover>
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <button
                  className='bg-green h-12 w-12 p-2 rounded-lg text-xl font-bold flex items-center justify-center cursor-pointer'
                >
                  { user.name![0] }
                </button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent className='bg-cards-secondary text-white px-3 py-1 rounded-md text-sm'>
              <p> Seu Perfil </p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent className='w-64 bg-cards-secondary text-white p-4 rounded-lg shadow-lg border border-gray'>
              <div className="flex flex-col space-y-2">
                <h4 className="font-semibold text-lg"> <strong>{ user.name }</strong> </h4>
                <p className="text-sm text-zinc-300"> <strong>{ user.email }</strong> </p>
                <p className="text-sm text-zinc-300"> Função: <strong>{ user.role.toLowerCase() }</strong> </p>
                <hr className="my-2 border-zinc-700" />
              </div>
              <motion.div
                onClick={ handleLogout }
                whileHover={{ background: '#ff595e' }}
                className='flex items-center justify-between h-full rounded-lg p-2'
              >
                <button type='submit' className='text-red font-semibold'>
                  Logout
                </button>
                <SignOut weight='bold' color='#D00000' />
              </motion.div>
          </PopoverContent>
        </Popover>
      </section>
    </TooltipProvider>
  );
}