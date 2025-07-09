import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ServersTable } from '@/components/ui/tables/serversTable';

export default async function ServersPage() {
   const session = await auth();
 
   if (!session?.user) {
     redirect('/');
   }

   return (
    <nav className='min-h-screen px-4 py-3 flex justify-between gap-4' >
      <main className='w-full mt-4 flex flex-col gap-2' >
        <h1 className='text-3xl font-bold' >
          Servidores
        </h1>
        <div className='h-auto w-full bg-cards-primary rounded-lg p-7' >
          <ServersTable userRole={ session.user.role } />
        </div>
      </main>
    </nav>
  )
}