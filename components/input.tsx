import { InputHTMLAttributes, forwardRef } from 'react'
import { Icon } from 'phosphor-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  icon?: Icon
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  error = false,
  icon: IconComponent,
  label,
  className,
  ...props
}, ref) => {
  const baseStyle = 'w-full py-2.5 bg-foreground text-lg font-semibold text-gray rounded-lg'
  const errorStyle = 'w-full py-2.5 bg-foreground text-lg font-semibold text-gray rounded-lg border-2 border-red'

  const paddingStyle = IconComponent ? 'pl-10 pr-3' : 'px-3'

  return (
    <div className="w-full">
      { label && (
        <label className='text-lg font-bold text-foreground mb-2 block'>
          { label }
        </label>
      ) }
      <div className='relative w-full'>
        { IconComponent && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black">
            <IconComponent size={ 27 } weight='fill' />
          </div>
        ) }
        <input
          ref={ ref }
          className={ `${error ? errorStyle : baseStyle} ${paddingStyle} ${className}` }
          { ...props }
        />
      </div>
    </div>
  )
})