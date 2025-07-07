import { ClientsTable } from '@/components/ui/tables/clientsTable';

export default function ClientsPage() {
  return (
    <nav className='min-h-screen px-4 py-3 flex justify-between gap-4' >
      <main className='w-full mt-4 flex flex-col gap-2' >
        <h1 className='text-3xl font-bold' >
          Clientes
        </h1>
        <div className='h-auto w-full bg-cards-primary rounded-lg p-7' >
          <ClientsTable />
        </div>
      </main>
    </nav>
  )
}