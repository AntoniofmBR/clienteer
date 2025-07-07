import { questions } from '@/utils/constants';

export function QuestionsSection() {
  return (
    <nav className='min-h-screen w-full flex flex-col justify-center items-center gap-4 py-12 md:py-7 text-center md:text-left' >
      <div className='flex flex-col gap-3 mb-12 text-center' >
        <p className='text-sm md:text-lg text-green' >
          Perguntas
        </p>
        <h2 className='text-4xl md:text-5xl font-bold' >
          Perguntas Frequentes
        </h2>
        <span className='text-md md:text-2xl font-medium opacity-90' >
          Dúvidas? Sem problemas! Estamos aqui para ajudar.
        </span>
      </div>

      <div className='flex flex-col justify-center items-center gap-4' >
        { questions.map( ( question ) => (
          <div key={ question.question } className='flex flex-col gap-4 w-3/4 mt-12' >
            <h3 className='text-3xl font-bold text-green' >
              { question.question }
            </h3>
            <p className='text-md font-normal' >
              { question.answer }
            </p>
          </div>
        ) ) }
      </div>
    </nav>
  )
}