'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    emoji: '🔥',
    title: 'Looks a partir de',
    highlight: 'R$39,90',
    subtitle: 'Novidades toda semana pra você arrasar',
    cta: 'Comprar agora',
    href: '/produtos?filtro=novidades',
    gradient: 'from-[#fdf2f0] via-[#fef6f3] to-[#f9e8e4]',
    accentColor: 'text-red-500',
    badge: 'Nova coleção',
  },
  {
    id: 2,
    emoji: '💖',
    title: 'Mais vendidos',
    highlight: 'da semana',
    subtitle: 'As peças que todo mundo está comprando',
    cta: 'Ver mais',
    href: '/produtos?filtro=mais-vendidos',
    gradient: 'from-[#f5eef6] via-[#f9f3fa] to-[#f0e4f2]',
    accentColor: 'text-purple-500',
    badge: 'Destaques',
  },
  {
    id: 3,
    emoji: '⚡',
    title: 'Promoções',
    highlight: 'imperdíveis',
    subtitle: 'Descontos por tempo limitado',
    cta: 'Aproveitar',
    href: '/produtos?filtro=promocoes',
    gradient: 'from-[#fef9ee] via-[#fffbf2] to-[#fdf3e0]',
    accentColor: 'text-amber-500',
    badge: 'Oferta especial',
  },
  {
    id: 4,
    emoji: '🚚',
    title: 'Entrega rápida',
    highlight: 'na sua cidade',
    subtitle: 'Compra fácil e segura — parcele em até 6x',
    cta: 'Comprar agora',
    href: '/produtos',
    gradient: 'from-[#eef6f5] via-[#f2faf9] to-[#e4f2f0]',
    accentColor: 'text-teal-500',
    badge: 'Frete grátis',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef(null)
  const touchStartRef = useRef(0)
  const touchEndRef = useRef(0)

  const goTo = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  // Swipe mobile
  function handleTouchStart(e) {
    touchStartRef.current = e.touches[0].clientX
  }
  function handleTouchMove(e) {
    touchEndRef.current = e.touches[0].clientX
  }
  function handleTouchEnd() {
    const diff = touchStartRef.current - touchEndRef.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo((current + 1) % slides.length)
      else goTo((current - 1 + slides.length) % slides.length)
    }
  }

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden">
      <div
        className={`relative h-[50vh] md:h-[55vh] lg:h-[60vh] bg-gradient-to-br ${slide.gradient} transition-all duration-700 ease-in-out`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Decoração */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/15 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 h-full flex items-center">
          <div
            key={slide.id}
            className="w-full text-center animate-fade-in-up"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <span className="text-base">{slide.emoji}</span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-dark">
                {slide.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-brand-dark leading-[1.1] mb-3">
              {slide.title}{' '}
              <span className={`${slide.accentColor} font-bold italic`}>
                {slide.highlight}
              </span>
            </h2>

            <p className="text-sm md:text-base text-gray-500 mb-7 max-w-md mx-auto">
              {slide.subtitle}
            </p>

            <div className="flex gap-3 justify-center">
              <Link href={slide.href} className="btn-primary text-center px-8 py-3.5">
                {slide.cta}
              </Link>
              <Link href="/produtos" className="btn-outline text-center px-8 py-3.5">
                Ver coleção
              </Link>
            </div>
          </div>
        </div>

        {/* Setas desktop */}
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/70 backdrop-blur-sm rounded-full items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all z-20"
          aria-label="Anterior"
        >
          <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/70 backdrop-blur-sm rounded-full items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all z-20"
          aria-label="Próximo"
        >
          <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? 'w-7 h-2.5 bg-brand-dark'
                  : 'w-2.5 h-2.5 bg-brand-dark/20 hover:bg-brand-dark/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Barra de benefícios */}
      <div className="bg-brand-dark text-white">
        <div className="container-custom py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
            {[
              { icon: '🚚', text: 'Frete grátis acima de R$ 199' },
              { icon: '💳', text: 'Até 6x sem juros' },
              { icon: '🔄', text: 'Troca grátis em 30 dias' },
              { icon: '🔒', text: 'Compra 100% segura' },
            ].map((benefit) => (
              <div key={benefit.text} className="flex items-center justify-center gap-2 text-center">
                <span className="text-sm">{benefit.icon}</span>
                <span className="text-2xs md:text-xs text-white/80 tracking-wide">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
