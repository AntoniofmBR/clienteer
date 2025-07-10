import { Button } from './button';
import { Modal } from './modal';

interface ConfirmationModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl"
}

export function ConfirmationModal({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  className,
  size,
}: ConfirmationModalProps) {
  return (
    <Modal
      title={ title }
      description={ description }
      isOpen={ isOpen }
      onClose={ onClose }
      className={ className }
      size={ size }
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={ isLoading }
          variant="outline"
          onClick={ onClose }
        >
          Cancelar
        </Button>

        <Button
          disabled={ isLoading }
          variant="destructive"
          onClick={ onConfirm }
        >
          { isLoading ? 'Deletando...' : 'Continuar' }
        </Button>
      </div>
    </Modal>
  );
}