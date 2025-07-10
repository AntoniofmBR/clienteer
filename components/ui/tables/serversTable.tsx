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
import { motion } from 'framer-motion'
import { Plus, XCircle } from 'phosphor-react'
import { useQuery } from '@tanstack/react-query'

import { Server, ServerForTable } from "@/@types/servers"

import { columns as baseColumns } from "./serverColumns"

import { Modal } from '@/components/modal'
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
import { EditServerForm } from '@/components/editServerForm'
import { AddServerForm } from '@/components/addServersForm'
import { AddServersModal } from '@/components/addServersModal'

async function fetchServers(): Promise<ServerForTable[]> {
  const res = await fetch('/api/servers');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

export function ServersTable({ userRole }: { userRole: string }) {
  const options = [ 5,
    10, 15, 20 ]

  const [ selectedServer, setSelectedServer ] = useState<ServerForTable | null>(null)
  const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);

  const { data: servers, isLoading, isError } = useQuery<ServerForTable[]>({
    queryKey: ['servers'],
    queryFn: fetchServers,
  })


  const [ pagination, setPagination ] = useState({
    pageIndex: 0,
    pageSize: 5, //! valor inicial
  })

  const [ globalFilter, setGlobalFilter ] = useState('')
  const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([])
  const [ sorting, setSorting ] = useState<SortingState>([])

  const columns = baseColumns.map(( col ) => {
    if ( col.id === "actions" ) {
      return {
        ...col,
        cell: ({ row }: any) => (
          <Button onClick={() => setSelectedServer(row.original)} size="sm">
            Detalhes
          </Button>
        ),
      }
    }

    if ( 'accessorKey' in col && ( col.accessorKey === 'totalClients' || col.accessorKey === 'status' ) ) {
        return {
            ...col,
            enableSorting: true,
        };
    }

    return col
  })

  const table = useReactTable({
    data: servers ?? [],
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

    if (totalPages <= maxItems) {
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

  const filterTabs = [
    {
      id: 'todos',
      label: 'Todos',
      isActive: columnFilters.length === 0 && sorting.length === 0,
      action: () => {
        setColumnFilters([]);
        setSorting([]);
        setPageIndex(0);
      },
    },
    {
      id: 'ip',
      label: 'Ip',
      isActive: sorting.some(s => s.id === 'ip' && !s.desc) && columnFilters.length === 0,
      action: () => {
        setColumnFilters([]);
        setSorting([{ id: 'ip', desc: false }]);
        setPageIndex(0);
      },
    },
    {
      id: 'clientes',
      label: 'Clientes',
      isActive: sorting.some(s => s.id === 'totalClients' && !s.desc) && columnFilters.length === 0,
      action: () => {
        setColumnFilters([]);
        setSorting([{ id: 'totalClients', desc: false }]);
        setPageIndex(0);
      },
    },
    {
      id: 'status',
      label: 'Status',
      isActive: sorting.some(s => s.id === 'status' && !s.desc) && columnFilters.length === 0,
      action: () => {
        setColumnFilters([]);
        setSorting([{ id: 'status', desc: false }]);
        setPageIndex(0);
      },
    },
  ]

  function handleCloseModal() {
    setSelectedServer(null)
    setIsEditing(false)
    setIsAddModalOpen(false)
  }

  if ( isLoading ) return <p>Carregando tabela de servidores...</p>;
  if ( isError ) return <p>Erro ao carregar os servidores.</p>;

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-transparent flex flex-col justify-between">
      <header className='flex items-center justify-between' >
        <div className='relative bg-cards-secondary h-7 w-[30%] text-sm rounded-lg font-bold px-2 py-5 flex items-center justify-center gap-4' >
          { filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={tab.action}
              className="relative px-2 py-1 rounded-lg z-10 transition"
              style={{
                color: tab.isActive ? 'white' : '#A0A0A0'
              }}
            >
              {tab.label}
              {tab.isActive && (
                <motion.div
                  layoutId="active-server-background"
                  className="absolute inset-0 bg-green rounded-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className='flex w-[30%] h-12' >
          <Input
            placeholder='Pesquisar Servidor'
            value={ globalFilter ?? '' }
            onChange={ ( e ) => setGlobalFilter( e.target.value ) }
          />
        </div>

        { userRole === 'ADMIN' && (
          <div className='w-[30%] h-7 flex justify-end' >
            <button
              className='flex justify-end items-center gap-2 h-full'
              onClick={ () => setIsAddModalOpen(true) }
            >
              <Plus
                weight='bold'
                size={ 27 }
              />
              <p className='text-lg font-semibold' >
                Adicionar Novo Servidor
              </p>
            </button>
          </div>
        ) }
      </header>

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
                    key={cell.id}
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

      <footer className='flex items-center justify-between' >
        <div className='w-fit py-2 px-4 flex items-center justify-center bg-cards-secondary rounded-lg' >
          <p className='font-semibold' >
            { currentItemsPerPage } de { servers?.length } Servidores
          </p>
        </div>

        <div className='w-fit' >
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

        <div className='flex justify-center items-center gap-2 mr-2 w-fit' >
          <p className='text-lg font-semibold' >
            Servidores por Página
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

      <Modal
        isOpen={ !!selectedServer }
        onClose={ handleCloseModal }
        title='Detalhes do Servidor'
        description='Confira os detalhes do Servidor'
        size='xl'
      >
        { selectedServer && (
          <div>
            { isEditing && userRole === 'ADMIN' ? (
              <EditServerForm
                server={ selectedServer }
                onSuccess={ handleCloseModal }
                onCancel={ handleCloseModal }
              />
            ) : (
              <>
                <div className="space-y-2">
                  <p className='text-lg'>
                    <strong> Nome: </strong> { selectedServer.name }
                  </p>
                  <p className='text-lg'>
                    <strong> IP: </strong> { selectedServer.ip }
                  </p>
                  <p className='text-lg'>
                    <strong> Quantidade de Clientes: </strong> { selectedServer.totalClients } Clientes
                  </p>
                  <p className='text-lg'>
                    <strong> Status: </strong> { selectedServer.status.toLowerCase() }
                  </p>
                  <p className='text-lg'>
                    <strong> Criado em: </strong> { new Date( selectedServer.createdAt ).toLocaleDateString('pt-BR') }
                  </p>
                  <p className='text-lg'>
                    <strong> Ultima vez atualizado em: </strong> { new Date( selectedServer.updatedAt ).toLocaleDateString('pt-BR') }
                  </p>
                </div>
                { userRole === 'ADMIN' && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={ () => setIsEditing(true) }>
                    Atualizar dados
                  </Button>
                </div>
              ) }
              </>
            ) }
          </div>
        ) }
      </Modal>

      <AddServersModal
        isAddModalOpen={ isAddModalOpen }
        setIsAddModalOpen={ setIsAddModalOpen }
      />
    </div>
  )
}