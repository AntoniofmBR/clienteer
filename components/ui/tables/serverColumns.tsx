import { ColumnDef } from "@tanstack/react-table"

import { Server, ServerForTable } from "@/@types/servers"
import { Button } from "@/components/button"

export const columns: ColumnDef<ServerForTable>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "totalClients",
    header: "Total de Clientes",
    cell: ({ row }) => {
      const totalClients = row.getValue('totalClients') as number
      return (
        <div className='flex items-center justify-center gap-1' >
            <p className='text-white' >
             { totalClients < 10 ? `0${ totalClients }` : totalClients } Clientes
            </p>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color = status === "FUNCIONANDO" ? "bg-emerald-500" : "bg-red";
      return (
        <div className='flex items-center justify-center gap-1' >
          <span
            className={ `px-1 py-1 rounded-full text-sm ${color}` }
            />
            <p className='text-white' >
             { status.toLowerCase() }
            </p>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: () => (
      <Button className='-w-12 h-8 text-sm flex items-center justify-center' >
        Detalhes
      </Button>
    ),
  },
]