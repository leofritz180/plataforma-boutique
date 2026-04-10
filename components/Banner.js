'use client'

import Link from 'next/link'

export default function Banner() {
  return (
    <section className="relative">
      <div className="relative h-[70vh] md:h-[85vh] bg-gradient-to-br from-brand-nude via-brand-cream to-brand-pink-light overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-pink/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-nude/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-xl">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-brand-pink-dark font-medium mb-4 animate-fade-in-up">
              Nova Coleção 2024
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-brand-dark leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Seu estilo,{' '}
              <span className="italic font-light">sua essência</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Peças pensadas para mulheres que valorizam conforto, elegância e personalidade no dia a dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/produtos?filtro=novidades" className="btn-primary text-center">
                Comprar agora
              </Link>
              <Link href="/produtos" className="btn-outline text-center">
                Ver coleção
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[45%]">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-light/50 to-brand-nude/50 flex items-center justify-center">
            <div className="w-80 h-[500px] bg-white/40 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <svg className="w-20 h-20 text-brand-pink/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm text-brand-pink-dark/60 font-light">Imagem da modelo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
