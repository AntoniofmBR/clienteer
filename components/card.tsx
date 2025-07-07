type CardProps = {
  title: string
  description: string
}

export function Card( { title, description }: CardProps ) {
  return (
    <div className='w-full p-4 bg-green text-foreground flex flex-col gap-2 rounded-lg mt-3' >
      <h2 className='text-xl font-semibold' >
        { title }
      </h2>
      <p className='text-xs md:text-sm' >
        { description }
      </p>
    </div>
  )
}