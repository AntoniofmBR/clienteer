import { User } from '@/@types/users';
import { AddClientForm } from './addClientsForm';
import { Modal } from './modal';
import { Server } from '@/@types/servers';

interface AddClientsModalProps {
  isAddModalOpen: boolean
  setIsAddModalOpen: ( value: boolean ) => void
  managers: User[]
  servers: Server[]
}

export function AddClientsModal( { isAddModalOpen, setIsAddModalOpen, managers, servers }: AddClientsModalProps ) {
  return (
    <Modal
        isOpen={ isAddModalOpen }
        onClose={ () => setIsAddModalOpen(false) }
        size='lg'
        title="Adicionar Novo Cliente"
        description="Preencha os dados abaixo para cadastrar um novo cliente."
      >
        <AddClientForm
          managers={ managers }
          servers={ servers }
          onClose={() => setIsAddModalOpen(false)}
        />
    </Modal>
  )
}