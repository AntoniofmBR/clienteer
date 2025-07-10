import { ServerForTable } from '@/@types/servers';
import { User } from "@/@types/users"

import { Button } from './button';
import { EditServerForm } from './editServerForm';
import { Modal } from './modal';

interface ServersTableModalProps {
  isOpen: boolean
  title?: string
  description?: string
  selectedServer: ServerForTable | null
  handleCloseModal: () => void
  isEditing: boolean
  userRole: string
  setIsEditing: ( arg: boolean ) => void
  handleOpenDeleteModal: ( arg1: ServerForTable ) => void
}

export function ServersTableModal({
  isOpen,
  title,
  description,
  selectedServer,
  handleCloseModal,
  isEditing,
  userRole,
  setIsEditing,
  handleOpenDeleteModal,
}: ServersTableModalProps) {
  return (
    <Modal
      isOpen={ isOpen }
      onClose={ handleCloseModal }
      title={ title }
      description={ description }
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
                <div className="mt-6 flex flex-col justify-between items-center gap-2 ">
                  <Button onClick={ () => setIsEditing(true) }>
                    Atualizar dados
                  </Button>
                  <Button variant='destructive' onClick={ () => handleOpenDeleteModal( selectedServer ) }>
                    Apagar Servidor
                  </Button>
                </div>
            ) }
            </>
          ) }
        </div>
      ) }
    </Modal>
  )
}