export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ClientsTable } from '@/components/ui/tables/clientsTable';
import { getClients } from '@/utils/getClients';
import { getManagers } from '@/utils/getManagers';
import { getServers } from '@/utils/getServers';


export default async function ClientsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const user = session.user

  const [ managers, servers] = await Promise.all([
    getManagers(),
    getServers()
  ]);

  return (
    <nav className='min-h-screen px-4 py-3 flex justify-between gap-4' >
      <main className='w-full mt-4 flex flex-col gap-2' >
        <h1 className='text-3xl font-bold' >
          Clientes
        </h1>
        <div className='h-auto w-full bg-cards-primary rounded-lg p-7' >
          <ClientsTable
            managers={ managers }
            servers={ servers }
            userRole={ user.role }
          />
        </div>
      </main>
    </nav>
  )
}