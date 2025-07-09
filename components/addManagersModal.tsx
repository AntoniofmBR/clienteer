import { AddManagerForm } from './addManagersForm';
import { Modal } from './modal';

interface AddManagerModalProps {
  isAddModalOpen: boolean
  setIsAddModalOpen: ( value: boolean ) => void
}

export function AddManagersModal( { isAddModalOpen, setIsAddModalOpen }: AddManagerModalProps ) {
  return (
    <Modal
        isOpen={ isAddModalOpen }
        onClose={ () => setIsAddModalOpen(false) }
        size='lg'
        title="Adicionar Novo Gerente"
        description="Preencha os dados abaixo para cadastrar um novo gerente."
      >
        <AddManagerForm
          onClose={() => setIsAddModalOpen(false)}
        />
    </Modal>
  )
}