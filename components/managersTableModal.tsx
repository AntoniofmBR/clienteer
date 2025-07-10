import { ManagerForTable } from '@/@types/users';

import { Button } from './button';
import { EditManagerForm } from './editManagerForm';
import { Modal } from './modal';

interface ManagersTableModalProps {
  isOpen: boolean
  title?: string
  description?: string
  selectedManager: ManagerForTable | null
  handleCloseModal: () => void
  isEditing: boolean
  userRole: string
  setIsEditing: ( arg: boolean ) => void
  handleOpenDeleteModal: ( arg1: ManagerForTable | null ) => void
}

export function ManagersTableModal({
  isOpen,
  title,
  description,
  selectedManager,
  handleCloseModal,
  isEditing,
  userRole,
  setIsEditing,
  handleOpenDeleteModal,
}: ManagersTableModalProps) {
  return (
    <Modal
      isOpen={ !!selectedManager }
      onClose={ handleCloseModal }
      title={ title }
      description={ title }
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
                <div className="mt-6 flex flex-col justify-between items-center gap-2 ">
                  <Button onClick={ () => setIsEditing(true) }>
                    Atualizar dados
                  </Button>
                  <Button variant='destructive' onClick={ () => handleOpenDeleteModal( selectedManager ) }>
                    Apagar Gerente
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