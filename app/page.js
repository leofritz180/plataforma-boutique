import Banner from '@/components/Banner'
import CategoryBar from '@/components/CategoryBar'
import ProductGrid from '@/components/ProductGrid'
import MonteSeuLook from '@/components/MonteSeuLook'
import ProvaSocial from '@/components/ProvaSocial'
import { products } from '@/lib/data'
import Link from 'next/link'

export default function Home() {
  const novidades = products.filter((p) => p.tag === 'Novo').slice(0, 8)
  const maisVendidos = products.slice(0, 8)
  const promos = products.filter((p) => p.tag === 'Promo')

  return (
    <>
      {/* Banner principal */}
      <Banner />

      {/* Categorias */}
      <CategoryBar />

      {/* Novidades */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <h2 className="section-title">
                Novidades
              </h2>
              <p className="section-subtitle">
                Acabou de chegar na loja
              </p>
            </div>
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-brand-dark hover:text-brand-pink-dark transition-colors"
            >
              Ver tudo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <ProductGrid products={novidades} />

          <div className="md:hidden text-center mt-8">
            <Link href="/" className="btn-outline inline-block">
              Ver todas as novidades
            </Link>
          </div>
        </div>
      </section>

      {/* Banner secundário */}
      <section className="bg-brand-nude-light">
        <div className="container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="aspect-[4/3] bg-gradient-to-br from-brand-pink-light to-brand-nude rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-brand-pink/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <p className="text-sm text-brand-pink-dark/40">Imagem da campanha</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-brand-pink-dark font-medium mb-4">
                Coleção Verão
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight mb-4">
                Leve, fresca e <span className="italic font-light">estilosa</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Tecidos leves e cores que combinam com os dias mais quentes. Vista-se com conforto sem abrir mão do estilo.
              </p>
              <Link href="/" className="btn-primary inline-block">
                Explorar coleção
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mais vendidos */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <h2 className="section-title">
                Mais <span className="italic font-light">vendidos</span>
              </h2>
              <p className="section-subtitle">
                Os queridinhos das nossas clientes
              </p>
            </div>
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-brand-dark hover:text-brand-pink-dark transition-colors"
            >
              Ver tudo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <ProductGrid products={maisVendidos} />
        </div>
      </section>

      {/* Monte seu look */}
      <MonteSeuLook />

      {/* Promoções */}
      {promos.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <div>
                <h2 className="section-title">
                  Ofertas <span className="italic font-light text-red-500">especiais</span>
                </h2>
                <p className="section-subtitle">
                  Aproveite antes que acabe
                </p>
              </div>
            </div>
            <ProductGrid products={promos} />
          </div>
        </section>
      )}

      {/* Prova social */}
      <ProvaSocial />

      {/* WhatsApp flutuante */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-200"
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  )
}
