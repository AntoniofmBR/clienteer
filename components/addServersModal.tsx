import { Modal } from './modal';
import { AddServerForm } from './addServersForm';

interface AddServerModalProps {
  isAddModalOpen: boolean
  setIsAddModalOpen: ( value: boolean ) => void
}

export function AddServersModal( { isAddModalOpen, setIsAddModalOpen }: AddServerModalProps ) {
  return (
    <Modal
        isOpen={ isAddModalOpen }
        onClose={ () => setIsAddModalOpen(false) }
        size='lg'
        title="Adicionar Novo Servidor"
        description="Preencha os dados abaixo para cadastrar um novo servidor."
      >
        <AddServerForm
          onClose={() => setIsAddModalOpen(false)}
        />
    </Modal>
  )
}