'use client'

import Link from 'next/link'
import { useCart } from '@/lib/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const {
    id,
    name,
    price,
    originalPrice,
    tag,
    badge,
    urgency,
    colors,
    sold,
    rating,
  } = product

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="group">
      <Link href={`/produto/${id}`} className="block">
        {/* Imagem */}
        <div className="relative aspect-[3/4] bg-brand-nude-light overflow-hidden mb-3">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-nude-light via-brand-cream to-brand-pink-light flex items-center justify-center">
            <svg className="w-16 h-16 text-brand-pink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="bg-red-500 text-white px-2.5 py-1 text-[10px] tracking-wider uppercase font-bold">
                -{discount}%
              </span>
            )}
            {tag === 'Novo' && (
              <span className="bg-brand-dark text-white px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium">
                Novo
              </span>
            )}
          </div>

          {/* Badge (mais vendido / favorito) */}
          {badge && (
            <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-brand-dark px-2 py-1 text-[10px] font-semibold rounded-full shadow-sm">
              {badge}
            </span>
          )}

          {/* Urgência */}
          {urgency && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-8 pb-2.5 px-3">
              <p className="text-white text-[10px] font-medium tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                {urgency}
              </p>
            </div>
          )}

          {/* Hover desktop - compra rápida */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block translate-y-2 group-hover:translate-y-0">
            {!urgency && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addItem(product, product.sizes?.[1] || product.sizes?.[0] || 'M')
                }}
                className="w-full bg-brand-dark text-white py-3 text-xs tracking-widest uppercase font-medium hover:bg-black transition-colors"
              >
                Compra rápida
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="px-0.5">
          {/* Rating + vendidos */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center gap-0.5">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-[10px] text-gray-500 font-medium">{rating}</span>
            </div>
            {sold && (
              <span className="text-[10px] text-gray-400">
                {sold}+ vendidos
              </span>
            )}
          </div>

          {/* Nome */}
          <h3 className="text-sm text-brand-charcoal leading-snug mb-2 line-clamp-2 group-hover:text-brand-dark transition-colors">
            {name}
          </h3>

          {/* Preços */}
          <div className="mb-1">
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className={`text-lg font-bold ${originalPrice ? 'text-red-500' : 'text-brand-dark'}`}>
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Pix */}
          <p className="text-[11px] text-green-600 font-medium mb-1">
            R$ {(price * 0.9).toFixed(2).replace('.', ',')} no Pix
          </p>

          {/* Parcelamento */}
          <p className="text-[10px] text-gray-400">
            até 6x de R$ {(price / 6).toFixed(2).replace('.', ',')} s/ juros
          </p>

          {/* Cores */}
          {colors && colors.length > 1 && (
            <div className="flex gap-1.5 mt-2">
              {colors.map((color, idx) => (
                <span
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Botão mobile */}
      <button
        onClick={() => addItem(product, product.sizes?.[1] || product.sizes?.[0] || 'M')}
        className="md:hidden w-full mt-3 bg-brand-dark text-white py-3 text-xs tracking-widest uppercase font-medium active:scale-[0.98] transition-transform"
      >
        Adicionar ao carrinho
      </button>
    </div>
  )
}
