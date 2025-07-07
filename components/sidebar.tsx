'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Gear, HardDrives, SignOut, Users } from 'phosphor-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'

import logoShort from '@/public/shortLogo.png'

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

const MotionIcon = ({ icon: Icon, isActive }: { icon: React.ElementType, isActive: boolean }) => (
  <motion.div
    animate={{ color: isActive ? '#2D6A4F' : '#808080' }}
    transition={{ duration: 0.3 }}
  >
    <Icon size={ 40 } weight='fill' />
  </motion.div>
);

function SidebarContent() {
  const path = usePathname()

  const [currentUser] = useState<UserProfile | null>({
    name: "Fulano da Silva",
    email: "fulano@example.com",
    role: "admin",
  });

  const navLinks = [
    { href: '/clients', icon: Users, tooltip: 'Clientes' },
    { href: '/servers', icon: HardDrives, tooltip: 'Servidores' },
    { href: '/settings', icon: Gear, tooltip: 'Configurações' },
  ];

  return (
    <TooltipProvider>
      <section className='flex flex-col justify-between items-center h-full rounded-lg py-7 bg-cards-primary px-12'>
        <Image
          src={logoShort}
          alt='Logo Clienteer'
          className='max-w-14'
          priority
        />

        <div className='flex flex-col gap-4 w-full items-center justify-center'>
          {navLinks.map((link) => {
            const isActive = path.includes(link.href);
            return (
              <Tooltip key={ link.href }>
                <TooltipTrigger asChild>
                  <Link href={ link.href }>
                    <MotionIcon icon={ link.icon } isActive={ isActive } />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className='bg-cards-secondary text-green px-3 py-1 rounded-md font-semibold text-sm'>
                  <p>{ link.tooltip }</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <Popover>
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <button
                  className='bg-green h-12 w-12 p-2 rounded-lg text-xl font-bold flex items-center justify-center cursor-pointer'
                >
                  F
                </button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent className='bg-cards-secondary text-white px-3 py-1 rounded-md text-sm'>
              <p> Seu Perfil </p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent className='w-64 bg-cards-secondary text-white p-4 rounded-lg shadow-lg border border-gray'>
              <div className="flex flex-col space-y-2">
                <h4 className="font-semibold text-lg">{ currentUser!.name }</h4>
                <p className="text-sm text-zinc-300">{ currentUser!.email }</p>
                <p className="text-sm text-zinc-300">Função: { currentUser!.role }</p>
                <hr className="my-2 border-zinc-700" />
              </div>
              <div className='flex items-center justify-between' >
                <button className='text-red font-semibold' >
                  Logout
                </button>
                <SignOut weight='bold' color='#D00000' />
              </div>
          </PopoverContent>
        </Popover>
      </section>
    </TooltipProvider>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen"
    >
      <ResizablePanel
        defaultSize={ 12 }
        minSize={ 10 }
        maxSize={ 17 }
        className="bg-cards-primary"
      >
        <SidebarContent />
      </ResizablePanel>

      <ResizableHandle className='bg-gray' />

      <ResizablePanel
        defaultSize={ 85 }
      >
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}