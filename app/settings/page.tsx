import { redirect } from 'next/navigation';

import { SettingsForm } from '@/components/settingsForm';
import { auth } from '@/auth';

export default async function SettingsPage() {
  const session = await auth()

  if ( !session?.user ) {
    redirect('/');
  }

  const user = {
    id: session.user.id,
    name: session.user.name ?? 'Nome não encontrado', //! por algum motivo tem q por
    email: session.user.email ?? 'Email não encontrado',
  };

  return (
    <nav className='min-h-screen px-4 py-3 flex flex-col gap-4' >
      <main className='w-full mt-4 flex flex-col gap-2' >
        <h1 className='text-3xl font-bold' >
          Configurações
        </h1>
        <SettingsForm user={ user } userRole={ session.user.role } />
      </main>
    </nav>
  )
}