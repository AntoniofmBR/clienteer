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

import { ManagerForTable, User } from "@/@types/users"

import { columns as baseColumns } from "./managerColumns"

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
import { useQuery } from '@tanstack/react-query'
import { AddManagersModal } from '@/components/addManagersModal'
import { EditManagerForm } from '@/components/editManagerForm'

async function fetchManagers(): Promise<ManagerForTable[]> {
  const res = await fetch('/api/managers');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

export function ManagersTable({ userRole }: { userRole: string }) {
  const options = [ 5,
    10, 15, 20 ]

  const [ selectedManager, setSelectedManager ] = useState<ManagerForTable | null>(null)
  const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);

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

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-transparent flex flex-col justify-between">
      <header className='flex items-center justify-between' >
        <div className='relative bg-cards-secondary h-7 w-[30%] text-sm rounded-lg font-bold px-2 py-5 flex items-center justify-center gap-4' >
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

        <div className='flex w-[30%] h-12' >
          <Input
            placeholder='Pesquisar Gerentes'
            value={ globalFilter ?? '' }
            onChange={ ( e ) => setGlobalFilter( e.target.value ) }
          />
        </div>
        
        { userRole === 'ADMIN' && (
          <div className='w-[30%] h-7 flex justify-end' >
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

      <footer className='flex items-center justify-between' >
        <div className='w-fit py-2 px-4 flex items-center justify-center bg-cards-secondary rounded-lg' >
          <p className='font-semibold' >
            { currentItemsPerPage } de { managers?.length } Gerentes
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

      <Modal
        isOpen={ !!selectedManager }
        onClose={ handleCloseModal }
        title='Detalhes do Gerente'
        description='Confira os detalhes do gerente'
        size='xl'
      >
        { selectedManager && (
          <div className="space-y-2">
            { isEditing && userRole === 'ADMIN' ? (
              <EditManagerForm
                manager={ selectedManager }
                onSuccess={ handleCloseModal }
                onCancel={ handleCloseModal }
              />
            ) : (
              <>
                <div className="space-y-2" >
                  <p className='text-lg'>
                    <strong> Id: </strong> { selectedManager.id }
                  </p>
                  <p className='text-lg'>
                    <strong> Nome: </strong> { selectedManager.name }
                  </p>
                  <p className='text-lg'>
                    <strong> Email: </strong> { selectedManager.email }
                  </p>
                  <p className='text-lg'>
                    <strong> Total de clientes: </strong> { selectedManager.clientsCount }
                  </p>
                  <p className='text-lg'>
                    <strong> Criado em: </strong> { new Date( selectedManager.createdAt ).toLocaleDateString('pt-BR') }
                  </p>
                  <p className='text-lg'>
                    <strong> Ultima vez atualizado em: </strong> { new Date( selectedManager.updatedAt ).toLocaleDateString('pt-BR') }
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

      <AddManagersModal
        isAddModalOpen={ isAddModalOpen }
        setIsAddModalOpen={ setIsAddModalOpen }
      />
    </div>
  )
}