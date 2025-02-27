import Footer from '@/components/Footer'
import Header from '@/components/Header'
import GameRules from '@/components/terms-of-service/GameRules'
import Hero from '@/components/terms-of-service/Hero'
import IntroSection from '@/components/terms-of-service/IntroSection'
import React from 'react'

export default function Page() {
  return (
    <div className="bg-white">
      <Header/>
      <Hero/>
      <IntroSection/>
      <GameRules/>
      <Footer/>
    </div>
  )
}
