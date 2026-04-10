import HeroCarousel from '@/components/HeroCarousel'
import CategoryBar from '@/components/CategoryBar'
import ProductGrid from '@/components/ProductGrid'
import MonteSeuLook from '@/components/MonteSeuLook'
import ProvaSocial from '@/components/ProvaSocial'
import { products } from '@/lib/data'
import Link from 'next/link'

export default function Home() {
  const novidades = products.filter((p) => p.tag === 'Novo')
  const maisVendidos = products.filter((p) => p.badge === '🔥 Mais vendido')
  const promos = products.filter((p) => p.tag === 'Promo')
  const favoritos = products.filter((p) => p.badge === '💖 Favorito')

  return (
    <>
      <HeroCarousel />
      <CategoryBar />

      {/* Mais Vendidos */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <h2 className="section-title">Mais vendidos 🔥</h2>
              <p className="section-subtitle">Os queridinhos que não param de sair</p>
            </div>
            <Link href="/produtos?filtro=mais-vendidos" className="hidden md:inline-flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-brand-dark hover:text-brand-pink-dark transition-colors">
              Ver tudo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <ProductGrid products={maisVendidos} />
        </div>
      </section>

      {/* Novidades da Semana */}
      <section className="pb-16 md:pb-24 bg-brand-cream/30">
        <div className="container-custom pt-16 md:pt-24">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <h2 className="section-title">Novidades da semana ✨</h2>
              <p className="section-subtitle">Acabou de chegar e já está fazendo sucesso</p>
            </div>
            <Link href="/produtos?filtro=novidades" className="hidden md:inline-flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-brand-dark hover:text-brand-pink-dark transition-colors">
              Ver tudo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <ProductGrid products={novidades} />
          <div className="md:hidden text-center mt-8">
            <Link href="/produtos?filtro=novidades" className="btn-outline inline-block">
              Ver todas as novidades
            </Link>
          </div>
        </div>
      </section>

      {/* Banner 40% OFF */}
      <section className="bg-brand-dark text-white overflow-hidden">
        <div className="container-custom py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-brand-pink font-medium mb-3">Só esta semana</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
                Até <span className="text-brand-pink font-bold">40% OFF</span> em peças selecionadas
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Aproveite os melhores preços em peças que combinam com você. Promoção por tempo limitado.
              </p>
              <Link href="/produtos?filtro=promocoes" className="inline-block px-10 py-4 bg-white text-brand-dark text-sm font-medium tracking-widest uppercase hover:bg-brand-pink-light transition-colors active:scale-[0.98]">
                Ver ofertas
              </Link>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-72 h-80 bg-white/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-display font-bold text-brand-pink">40%</p>
                  <p className="text-white/40 text-sm mt-2">de desconto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MonteSeuLook />

      {/* Promoções */}
      {promos.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <div>
                <h2 className="section-title">Promoções <span className="italic font-light text-red-500">imperdíveis</span> 🏷️</h2>
                <p className="section-subtitle">Aproveite antes que acabe — estoque limitado</p>
              </div>
              <Link href="/produtos?filtro=promocoes" className="hidden md:inline-flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-brand-dark hover:text-brand-pink-dark transition-colors">
                Ver tudo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
            <ProductGrid products={promos} />
          </div>
        </section>
      )}

      {/* Favoritos */}
      {favoritos.length > 0 && (
        <section className="py-16 md:py-24 bg-brand-nude-light/50">
          <div className="container-custom">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="section-title">Favoritos das clientes 💖</h2>
              <p className="section-subtitle">As peças mais amadas da nossa loja</p>
            </div>
            <ProductGrid products={favoritos} />
          </div>
        </section>
      )}

      <ProvaSocial />
    </>
  )
}
