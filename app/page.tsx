import { Header } from '@/components/header'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { QuestionsSection } from '@/components/sections/faq'

import { FadeInSection } from '@/animations/fadeIn'

export default function Home() {
  return (
    <main className='px-12 py-7 md:px-20' >
      <Header />
      <FadeInSection>
        <section id='hero' >
          <HeroSection />
        </section>
      </FadeInSection>
      <FadeInSection>
        <section id='about' >
          <AboutSection />
        </section>
      </FadeInSection>
      <FadeInSection>
        <section id='questions' >
          <QuestionsSection />
        </section>
      </FadeInSection>
    </main>
  )
}
