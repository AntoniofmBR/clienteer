import { ReactNode } from 'react'
import { X } from 'phosphor-react'
import { motion } from 'framer-motion'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = ''
}: ModalProps) {

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={ handleOverlayClick }
    >
      <Card className={`relative w-full ${sizeClasses[size]} mx-4 max-h-[90vh] overflow-auto bg-cards-primary text-white border-none ${className}`}>
        { showCloseButton && (
          <motion.button
            onClick={ onClose }
            whileHover={{ background: '#1C1D21', scale: 1.1 }}
            className="absolute right-4 top-4 z-10 rounded-full p-1 transition-colors"
            aria-label="Fechar modal"
          >
            <X size={ 20 } weight="bold" />
          </motion.button>
        ) }

        { ( title || description ) && (
          <CardHeader className={showCloseButton ? 'pr-12' : ''}>
            { title && <CardTitle className="text-2xl font-bold">{ title }</CardTitle> }
            { description && <CardDescription>{ description }</CardDescription> }
          </CardHeader>
        ) }

        {/* Conteúdo do Modal */}
        <CardContent className={!(title || description) ? 'pt-6' : ''}>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}