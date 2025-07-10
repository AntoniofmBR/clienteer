import { ClientForTable } from '@/@types/clients';
import { User } from "@/@types/users"

import { Button } from './button';
import { EditClientForm } from './editClientForm';
import { Modal } from './modal';
import { ServerForTable } from '@/@types/servers';

interface ClientsTableModalProps {
  isOpen: boolean
  title?: string
  description?: string
  selectedClient: ClientForTable | null
  handleCloseModal: () => void
  isEditing: boolean
  userRole: string
  managers: User[]
  servers: ServerForTable[]
  setIsEditing: ( arg: boolean ) => void
  handleOpenDeleteModal: ( arg1: ClientForTable | null ) => void
}

export function ClientsTableModal({
  isOpen,
  title,
  description,
  selectedClient,
  handleCloseModal,
  isEditing,
  userRole,
  managers,
  servers,
  setIsEditing,
  handleOpenDeleteModal,
}: ClientsTableModalProps ) {
  return (
    <Modal
      isOpen={ isOpen }
      onClose={ handleCloseModal }
      title={ title }
      description={ description }
    >
      { selectedClient && (
        <div>
          { isEditing && userRole === 'ADMIN' ? (
            <EditClientForm
              client={ selectedClient }
              managers={ managers }
              servers={ servers }
              onSuccess={ handleCloseModal }
              onCancel={ handleCloseModal }
            />
          ) : (
            <>
              <div className="space-y-2">
                <p className='text-lg'><strong>Id:</strong> { selectedClient.id }</p>
                <p className='text-lg'><strong>Nome:</strong> { selectedClient.name }</p>
                <p className='text-lg'><strong>Empresa:</strong> { selectedClient.company }</p>
                <p className='text-lg'><strong>Plano de Rota:</strong> { selectedClient.routePlan }</p>
                <p className='text-lg'><strong>PLano Fixo:</strong> { selectedClient.fixedPlan }</p>
                <p className='text-lg'><strong>Servidor:</strong> { selectedClient.server }</p>
                <p className='text-lg'><strong>Status:</strong> { selectedClient.status }</p>
                <p className='text-lg'><strong>Gerente:</strong> { selectedClient.managerName }</p>
                <p className='text-lg'><strong>Criado em:</strong> { new Date(selectedClient.createdAt).toLocaleDateString( 'pt-BR' ) }</p>
                <p className='text-lg'><strong>Ultima vez atualizado em: </strong> { new Date( selectedClient.updatedAt ).toLocaleDateString('pt-BR') }</p>
              </div>
              { userRole === 'ADMIN' && (
                <div className="mt-6 flex flex-col justify-between items-center gap-2 ">
                  <Button onClick={ () => setIsEditing(true) }>
                    Atualizar dados
                  </Button>
                  <Button variant='destructive' onClick={ () => handleOpenDeleteModal( selectedClient ) }>
                    Apagar Cliente
                  </Button>
                </div>
              ) }
            </>
          )}
        </div>
      )}
    </Modal>
  )
}