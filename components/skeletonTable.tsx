import { Skeleton } from './ui/skeleton';

export function SkeletonTable() {
  return (
    <section className='flex flex-col justify-between h-full rounded-lg py-7 px-7 bg-cards-primary' >
      <Skeleton className='h-22 w-full rounded-lg' />

      <Skeleton className='h-full w-full rounded-lg mt-12 ' />

      <div className='w-full flex justify-between items-center mt-12' >
        <Skeleton className='h-5 w-22 rounded-full' />

        <Skeleton className='h-5 w-12 rounded-full' />

        <Skeleton className='h-5 w-12 rounded-full' />
      </div>
    </section>
  )
}