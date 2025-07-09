import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/@types/users"
import { Button } from "@/components/button"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "clientsCount",
    header: "Total de Clientes",
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