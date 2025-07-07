import { ColumnDef } from "@tanstack/react-table"
import { Client } from "@/@types/clients"
import { Button } from "@/components/button"

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "company",
    header: "Empresa",
  },
  {
    accessorKey: "routePlan",
    header: "Plano de Rota",
  },
  {
    accessorKey: "fixedPlan",
    header: "Plano Fixo",
  },
  {
    accessorKey: "server",
    header: "Servidor",
  },
  {
    accessorKey: "manager",
    header: "Gerente",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const color = status === "Ativo" ? "bg-emerald-500" : "bg-red"
      return (
        <div className='flex items-center justify-center gap-1' >
          <span
            className={ `px-1 py-1 rounded-full text-sm ${color}` }
           />
           <p className='text-white' >
            { status }
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