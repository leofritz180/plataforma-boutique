'use client'

import Link from 'next/link'
import { lookProducts } from '@/lib/data'
import { useCart } from '@/lib/CartContext'
import { getProductById } from '@/lib/data'

export default function MonteSeuLook() {
  const { addItem } = useCart()
  const totalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0)

  function handleBuyLook() {
    lookProducts.forEach((item) => {
      const full = getProductById(item.id)
      if (full) {
        addItem(full, full.sizes?.[1] || full.sizes?.[0] || 'M', 1)
      }
    })
  }

  return (
    <section className="py-16 md:py-24 bg-brand-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Monte seu <span className="italic font-light">look</span>
          </h2>
          <p className="section-subtitle">
            Combinações pensadas para facilitar seu dia a dia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <div className="relative aspect-[3/4] bg-gradient-to-br from-brand-nude-light to-brand-pink-light rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <svg className="w-24 h-24 text-brand-pink/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              <p className="text-brand-pink-dark/50 text-sm">Look completo</p>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              {lookProducts.map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/produto/${item.id}`}
                  className="flex items-center gap-5 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-nude-light to-brand-pink-light rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-brand-pink-dark/50 font-light">{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-2xs tracking-widest uppercase text-brand-pink-dark font-medium">{item.label}</span>
                    <h4 className="text-sm font-medium text-brand-dark mt-0.5 group-hover:text-brand-pink-dark transition-colors truncate">{item.name}</h4>
                    <p className="text-sm font-semibold text-brand-dark mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-dark transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="mt-8 p-5 bg-brand-dark text-white rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/70">Look completo por</span>
                <span className="text-2xl font-display font-semibold">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={handleBuyLook}
                className="w-full py-3 bg-white text-brand-dark text-xs tracking-widest uppercase font-medium hover:bg-brand-pink-light transition-colors active:scale-[0.98]"
              >
                Comprar look completo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
