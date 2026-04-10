'use client'

import Link from 'next/link'

export default function ProductCard({ product, priority = false }) {
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    tag,
    colors,
  } = product

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <Link href={`/produto/${id}`} className="group block">
      {/* Imagem */}
      <div className="relative aspect-[3/4] bg-brand-nude-light overflow-hidden mb-3">
        {/* Placeholder com gradiente elegante */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-nude-light via-brand-cream to-brand-pink-light flex items-center justify-center">
          <svg className="w-16 h-16 text-brand-pink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Tag */}
        {tag && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-2xs tracking-wider uppercase font-medium ${
            tag === 'Novo' ? 'bg-brand-dark text-white' :
            tag === 'Promo' ? 'bg-red-500 text-white' :
            'bg-white text-brand-dark'
          }`}>
            {tag === 'Promo' && discount > 0 ? `-${discount}%` : tag}
          </span>
        )}

        {/* Botão rápido - aparece no hover (desktop) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-brand-dark py-2.5 text-xs tracking-widest uppercase font-medium hover:bg-brand-dark hover:text-white transition-colors"
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        {/* Cores disponíveis */}
        {colors && colors.length > 0 && (
          <div className="flex gap-1.5 mb-2">
            {colors.map((color, idx) => (
              <span
                key={idx}
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Nome */}
        <h3 className="text-sm text-brand-charcoal font-normal leading-snug mb-1 line-clamp-2 group-hover:text-brand-dark transition-colors">
          {name}
        </h3>

        {/* Preços */}
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              R$ {originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
          <span className={`text-sm font-semibold ${originalPrice ? 'text-red-500' : 'text-brand-dark'}`}>
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        {/* Parcelamento */}
        <p className="text-2xs text-gray-400 mt-0.5">
          até 6x de R$ {(price / 6).toFixed(2).replace('.', ',')} sem juros
        </p>

        {/* Botão mobile */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="md:hidden w-full mt-3 bg-brand-dark text-white py-2.5 text-xs tracking-widest uppercase font-medium active:scale-[0.98] transition-transform"
        >
          Comprar
        </button>
      </div>
    </Link>
  )
}
