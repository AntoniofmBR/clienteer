'use client'

import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
import { Plus, XCircle } from 'phosphor-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { ManagerForTable } from "@/@types/users"

import { columns as baseColumns } from "./managerColumns"

import { Button } from '@/components/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/input'
import { AddManagersModal } from '@/components/addManagersModal'
import { ConfirmationModal } from '@/components/confirmationModal'

import { deleteServerFn, fetchManagers } from '@/db/mutations/managersMutations'
import { ManagersTableModal } from '@/components/managersTableModal'
import { SkeletonTable } from '@/components/skeletonTable'

export function ManagersTable({ userRole }: { userRole: string }) {
  const options = [ 5,
    10, 15, 20 ]
  const queryClient = useQueryClient();

  const [ selectedManager, setSelectedManager ] = useState<ManagerForTable | null>(null)

  const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);

  const [ isEditing, setIsEditing ] = useState(false);

  const [ managerToDelete, setManagerToDelete ] = useState<ManagerForTable | null>(null)

  const { data: managers, isLoading, isError } = useQuery<ManagerForTable[]>({
    queryKey: ['managers'],
    queryFn: fetchManagers,
  })

  const [ pagination, setPagination ] = useState({
    pageIndex: 0,
    pageSize: 5, //! valor inicial
  })

  const [ globalFilter, setGlobalFilter ] = useState('')
  const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([])
  const [ sorting, setSorting ] = useState<SortingState>([])

  const columns = baseColumns.map((col) => {
    if ( col.id === "actions" ) {
      return {
        ...col,
        cell: ({ row }: any) => (
          <Button onClick={() => setSelectedManager(row.original)} size="sm">
            Detalhes
          </Button>
        ),
      }
    }

    if ( col.id === "totalClients" ) {
      return {
        ...col,
        cell: ({ row }: any) => (
          <p>
            123
          </p>
        ),
      }
    }

    if ( 'accessorKey' in col && ( col.accessorKey === 'totalClients' || col.accessorKey === 'email' ) ) {
        return {
            ...col,
            enableSorting: true,
        };
    }

    return col
  })

  const table = useReactTable({
    data: managers ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      pagination,
      globalFilter,
      columnFilters,
      sorting,
    },
  })

  const {
    getPageCount,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
    getState,
    setPageSize,
  } = table;

  const currentPage = getState().pagination.pageIndex + 1;
  const totalPages = getPageCount();
  const currentItemsPerPage = getState().pagination.pageSize;

  function getPaginationItems() {
    const items = [];
    const maxItems = 5;

    if ( totalPages <= maxItems ) {
      for (let i = 0; i < totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(0);

      if (currentPage > 2) {
        items.push('ellipsis-start');
      }

      const start = Math.max(1, currentPage - Math.floor(maxItems / 2));
      const end = Math.min(totalPages - 2, currentPage + Math.floor(maxItems / 2) - 1);

      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      if (currentPage < totalPages - 1) {
        items.push('ellipsis-end');
      }

      items.push(totalPages - 1);
    }
    return items;
  };

  function handleCloseModal() {
    setSelectedManager(null)
    setIsEditing(false)
    setIsAddModalOpen(false)
    setManagerToDelete( null )
  }

  const filterTabs = [
    {
      id: 'todos',
      label: 'Todos',
      isActive: columnFilters.length === 0 && sorting.length === 0,
      action: () => {
        setColumnFilters([])
        setSorting([])
        setPageIndex(0)
      },
    },
    {
      id: 'name',
      label: 'Nome',
      isActive: sorting.some((s) => s.id === 'name' && s.desc === false),
      action: () => {
        setColumnFilters([])
        setSorting([{ id: 'name', desc: false }])
        setPageIndex(0)
      },
    },
    {
      id: 'email',
      label: 'Email',
      isActive: sorting.some((s) => s.id === 'email' && s.desc === false),
      action: () => {
        setColumnFilters([])
        setSorting([{ id: 'email', desc: false }])
        setPageIndex(0)
      },
    },
    {
      id: 'clientsCount',
      label: 'Total de Gerentes',
      isActive: sorting.some((s) => s.id === 'clientsCount' && s.desc === false) && columnFilters.length === 0,
      action: () => {
        setColumnFilters([])
        setSorting([{ id: 'clientsCount', desc: false }])
        setPageIndex(0)
      },
    },
  ]

   const mutation = useMutation({
    mutationFn: deleteServerFn,
    onSuccess: () => {
      toast.success('Gerente removido com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['managers'] });
      handleCloseModal()
    },
    onError: ( err ) => {
      toast.error( err.message );
      setManagerToDelete(null);
    },
  });

  function handleOpenDeleteModal( manager: ManagerForTable | null ) {
    if ( !manager ) return
    setManagerToDelete(manager);
  };

  function handleRemove() {
    if ( managerToDelete ) {
      mutation.mutate(managerToDelete.id);
    } else {
      toast.error("Nenhum gerente selecionado para remoção.");
    }
  }

  if ( isLoading ) return <SkeletonTable />;
  if ( isError ) return <p>Erro ao carregar os gerentes.</p>;

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-transparent flex flex-col justify-between">
      <header className='flex flex-col items-center justify-between gap-4 md:flex-row' >
        <div className='relative bg-cards-secondary h-auto w-full text-sm rounded-lg font-bold px-2 py-3 flex items-center justify-center gap-2 flex-wrap md:w-auto' >
          { filterTabs.map((tab) => (
            <button
              key={ tab.id }
              onClick={ tab.action }
              className="relative px-2 py-1 rounded-lg z-10 transition"
              style={{
                color: tab.isActive ? 'white' : 'gray'
              }}
            >
              { tab.label }
              { tab.isActive && (
                <motion.div
                  layoutId="active-background"
                  className="absolute inset-0 bg-green rounded-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              ) }
            </button>
          ))}
        </div>

        <div className='flex w-full h-12 md:w-[30%]' >
          <Input
            placeholder='Pesquisar Gerentes'
            value={ globalFilter ?? '' }
            onChange={ ( e ) => setGlobalFilter( e.target.value ) }
          />
        </div>
        
        { userRole === 'ADMIN' && (
          <div className='w-full h-7 flex justify-center md:w-auto md:justify-end' >
            <button
              className='flex justify-end items-center gap-2 h-full'
              onClick={ () => setIsAddModalOpen( true ) }
            >
              <Plus
                weight='bold'
                size={ 27 }
              />
              <p className='text-lg font-semibold' >
                Adicionar Novo Gerente
              </p>
            </button>
          </div>
        ) }
      </header>

      <div className='overflow-x-auto' >
        <table className="w-full text-center text-sm border-separate border-spacing-y-3">
          <thead className="bg-cards-secondary text-white">
            { table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                { headerGroup.headers.map((header, index) => (
                  <th
                    key={ header.id }
                    className={`
                      px-4 py-3 font-semibold
                      ${ index === 0 ? 'rounded-l-lg' : '' }
                      ${ index === headerGroup.headers.length - 1 ? 'rounded-r-lg' : '' }
                    `}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-center gap-1">
                      { flexRender(header.column.columnDef.header, header.getContext()) }
                      { header.column.getIsSorted() === 'asc' && <span className="ml-1">⬆️</span> }
                      { header.column.getIsSorted() === 'desc' && <span className="ml-1">⬇️</span> }
                    </div>
                  </th>
                )) }
              </tr>
            )) }
          </thead>

          <tbody>
            { table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <tr
                  key={ row.id }
                  className="bg-cards-secondary rounded-lg overflow-hidden my-2"
                >
                  { row.getVisibleCells().map(cell => (
                    <td
                      key={ cell.id }
                      className="px-4 py-3 text-white first:rounded-l-lg last:rounded-r-lg"
                    >
                      { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                    </td>
                  )) }
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={ columns.length } className="flex items-center justify-center gap-2 text-center py-4 text-white">
                  <XCircle size={ 22 } weight='fill' />
                  <p>
                    Nenhum resultado encontrado.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className='flex flex-col items-center justify-between gap-4 mt-4 md:flex-row' >
        <div className='w-full md:w-fit py-2 px-4 flex items-center justify-center bg-cards-secondary rounded-lg' >
          <p className='font-semibold' >
            { currentItemsPerPage } de { managers?.length } Gerentes
          </p>
        </div>

        <div className='w-full md:w-auto flex justify-center' >
          { table.getRowModel().rows.length > 0 && (
            <div className="flex items-center justify-end space-x-2 p-4 bg-cards-secondary rounded-lg h-fit">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    { getCanPreviousPage() ? (
                      <PaginationPrevious size='sm' onClick={() => previousPage()} />
                    ) : (
                      <PaginationPrevious size='sm' className="pointer-events-none opacity-50" />
                    ) }
                  </PaginationItem>
                  {getPaginationItems().map((item, index) => (
                    <PaginationItem key={ index }>
                      { typeof item === 'number' ? (
                        <PaginationLink
                          onClick={() => setPageIndex(item)}
                          isActive={item === pagination.pageIndex}
                          size='sm'
                        >
                          {item + 1}
                        </PaginationLink>
                      ) : (
                        <PaginationEllipsis />
                      ) }
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    {getCanNextPage() ? (
                      <PaginationNext size='sm' onClick={() => nextPage()} />
                    ) : (
                      <PaginationNext size='sm' className="pointer-events-none opacity-50" />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          ) }
        </div>

        <div className='w-full flex justify-center items-center gap-2 md:w-fit' >
          <p className='text-lg font-semibold' >
            Gerentes por Página
          </p>
          <Select
            value={`${currentItemsPerPage}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] bg-cards-secondary text-white">
              <SelectValue placeholder={currentItemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent className="bg-cards-secondary text-white">
              { options.map(( pageSize ) => (
                <SelectItem key={ pageSize } value={`${ pageSize }`}>
                  { pageSize }
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </footer>

      <ManagersTableModal
        isOpen={ !!selectedManager }
        title={ isEditing ? "Editar Gerente" : "Detalhes do Gerente"}
        description={ isEditing ? "Altere os dados necessários abaixo." : 'Confira os detalhes do gerente' }
        handleCloseModal={ handleCloseModal }
        handleOpenDeleteModal={ () => handleOpenDeleteModal( selectedManager ) }
        isEditing={ isEditing }
        selectedManager={ selectedManager }
        setIsEditing={ setIsEditing }
        userRole={ userRole }
      />

      <AddManagersModal
        isAddModalOpen={ isAddModalOpen }
        setIsAddModalOpen={ setIsAddModalOpen }
      />

    <ConfirmationModal
      title={ managerToDelete ? `Tem Certeza que Deseja Remover "${ managerToDelete.name }"?` : "Tem Certeza que Deseja Continuar?" }
      description='Essa ação é irreversível!'
      isOpen={ !!managerToDelete }
      onClose={ handleCloseModal }
      onConfirm={ handleRemove }
      isLoading={ mutation.isPending }
      size='lg'
    />
    </div>
  )
}