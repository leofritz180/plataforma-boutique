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
    imageGradient: 'from-[#f9d5ce]/60 to-[#f5bfb5]/40',
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
    imageGradient: 'from-[#e8d5f0]/60 to-[#dbc4e8]/40',
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
    imageGradient: 'from-[#f5e6c8]/60 to-[#f0d9ae]/40',
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
    imageGradient: 'from-[#c8e8e4]/60 to-[#b5ddd8]/40',
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

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  // Pausar ao hover
  function pauseAutoplay() {
    clearInterval(timerRef.current)
  }
  function resumeAutoplay() {
    timerRef.current = setInterval(next, 5000)
  }

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
      if (diff > 0) next()
      else prev()
    }
  }

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden">
      <div
        className={`relative min-h-[75vh] md:min-h-[85vh] bg-gradient-to-br ${slide.gradient} transition-all duration-700 ease-in-out`}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Decoração de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl transition-all duration-700" />
          <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-white/15 rounded-full blur-3xl transition-all duration-700" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-pink/10 rounded-full blur-3xl animate-pulse-soft" />
        </div>

        <div className="container-custom relative z-10 h-full min-h-[75vh] md:min-h-[85vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-16 md:py-0">
            {/* Texto */}
            <div
              key={slide.id}
              className="text-center lg:text-left animate-fade-in-up"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
                <span className="text-lg">{slide.emoji}</span>
                <span className="text-xs tracking-widest uppercase font-semibold text-brand-dark">
                  {current === 0 ? 'Nova coleção' : current === 1 ? 'Destaques' : current === 2 ? 'Oferta especial' : 'Frete grátis'}
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-brand-dark leading-[1.05] mb-4">
                {slide.title}{' '}
                <span className={`${slide.accentColor} font-bold italic`}>
                  {slide.highlight}
                </span>
              </h2>

              <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href={slide.href}
                  className="btn-primary text-center text-base px-10 py-4"
                >
                  {slide.cta}
                </Link>
                <Link
                  href="/produtos"
                  className="btn-outline text-center text-base px-10 py-4"
                >
                  Ver coleção
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                {[
                  { value: '5mil+', label: 'Clientes' },
                  { value: '4.9', label: 'Avaliação' },
                  { value: '24h', label: 'Envio' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-lg md:text-xl font-bold text-brand-dark">{stat.value}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagem / Visual */}
            <div className="hidden lg:flex justify-center items-center">
              <div
                key={`img-${slide.id}`}
                className="relative animate-fade-in-up"
                style={{ animationDelay: '0.15s' }}
              >
                {/* Card principal */}
                <div className={`w-[380px] h-[520px] bg-gradient-to-br ${slide.imageGradient} rounded-3xl flex items-center justify-center shadow-2xl shadow-black/5 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10" />
                  <div className="relative text-center">
                    <div className="w-28 h-28 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <span className="text-5xl">{slide.emoji}</span>
                    </div>
                    <p className="text-sm text-brand-dark/40 font-light">Imagem da modelo</p>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute top-6 right-6 bg-white rounded-2xl px-4 py-3 shadow-lg">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hoje</p>
                    <p className="text-lg font-bold text-brand-dark">+127</p>
                    <p className="text-[10px] text-green-500 font-medium">vendas</p>
                  </div>

                  {/* Floating price */}
                  <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-4 py-3 shadow-lg">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">A partir de</p>
                    <p className="text-xl font-bold text-red-500">R$ 39,90</p>
                  </div>
                </div>

                {/* Floating card atrás */}
                <div className="absolute -top-4 -right-6 w-24 h-32 bg-white/60 rounded-2xl -rotate-6 -z-10 shadow-lg" />
                <div className="absolute -bottom-4 -left-6 w-28 h-36 bg-white/40 rounded-2xl rotate-6 -z-10 shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? 'w-8 h-3 bg-brand-dark'
                  : 'w-3 h-3 bg-brand-dark/20 hover:bg-brand-dark/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Setas desktop */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all z-20"
          aria-label="Anterior"
        >
          <svg className="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all z-20"
          aria-label="Próximo"
        >
          <svg className="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Barra de benefícios */}
      <div className="bg-brand-dark text-white">
        <div className="container-custom py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: '🚚', text: 'Frete grátis acima de R$ 199' },
              { icon: '💳', text: 'Até 6x sem juros' },
              { icon: '🔄', text: 'Troca grátis em 30 dias' },
              { icon: '🔒', text: 'Compra 100% segura' },
            ].map((benefit) => (
              <div key={benefit.text} className="flex items-center justify-center gap-2 text-center">
                <span className="text-base">{benefit.icon}</span>
                <span className="text-2xs md:text-xs text-white/80 tracking-wide">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
