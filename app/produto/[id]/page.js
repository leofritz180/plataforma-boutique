'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import { useCart } from '@/lib/CartContext'
import { getProductById, getRelatedProducts } from '@/lib/data'

export default function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const related = getRelatedProducts(id, 4)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container-custom py-32 text-center">
        <h2 className="font-display text-2xl text-brand-dark mb-4">Produto não encontrado</h2>
        <Link href="/" className="btn-primary inline-block">Voltar à loja</Link>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const gallery = [
    { label: 'Frente' },
    { label: 'Costas' },
    { label: 'Detalhe' },
    { label: 'Modelo' },
  ]

  function handleAddToCart() {
    if (!selectedSize) return
    addItem(product, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const whatsMessage = encodeURIComponent(`Olá, quero saber mais sobre: ${product.name} - R$ ${product.price.toFixed(2).replace('.', ',')}`)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-cream/50">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-brand-dark truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Produto */}
      <section className="py-6 md:py-16 pb-32 md:pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
            {/* Galeria */}
            <div>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-brand-nude-light via-brand-cream to-brand-pink-light rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {discount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold">
                      -{discount}%
                    </span>
                  )}
                  {product.tag === 'Novo' && (
                    <span className="bg-brand-dark text-white px-3 py-1 text-xs font-medium">
                      Novo
                    </span>
                  )}
                  {product.badge && (
                    <span className="bg-white/95 text-brand-dark px-3 py-1 text-xs font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <svg className="w-24 h-24 text-brand-pink/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-sm text-brand-pink-dark/40">{gallery[selectedImage].label}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gradient-to-br from-brand-nude-light to-brand-pink-light rounded-lg flex items-center justify-center transition-all ${
                      selectedImage === idx ? 'ring-2 ring-brand-dark ring-offset-1' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <span className="text-2xs text-brand-pink-dark/50">{img.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:py-4">
              <span className="text-xs tracking-[0.2em] uppercase text-brand-pink-dark font-medium">
                {product.category}
              </span>

              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-brand-dark mt-2 mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Rating + vendidos */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews} avaliações)</span>
                </div>
                <span className="text-xs text-gray-400">{product.sold}+ vendidos</span>
              </div>

              {/* Urgência */}
              {product.urgency && (
                <div className="flex items-center gap-2 mb-5 bg-red-50 px-4 py-2.5 rounded-lg">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-600 font-medium">{product.urgency}</span>
                </div>
              )}

              {/* Preço */}
              <div className="mb-6 pb-6 border-b border-gray-100 bg-brand-cream/50 p-5 rounded-xl">
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through block mb-1">
                    De R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <div className="flex items-baseline gap-3">
                  <span className={`text-4xl font-bold ${product.originalPrice ? 'text-red-500' : 'text-brand-dark'}`}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {discount > 0 && (
                    <span className="text-sm bg-red-500 text-white px-2.5 py-1 rounded font-bold">
                      -{discount}%
                    </span>
                  )}
                </div>
                <p className="text-base text-green-600 mt-2 font-semibold">
                  R$ {(product.price * 0.9).toFixed(2).replace('.', ',')} no Pix (10% off)
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ou até <strong>6x de R$ {(product.price / 6).toFixed(2).replace('.', ',')}</strong> sem juros
                </p>
              </div>

              {/* Cores */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark mb-3">Cor</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${
                          idx === 0 ? 'border-brand-dark scale-110' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tamanhos */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark">Tamanho</h3>
                  <button className="text-xs text-brand-pink-dark underline hover:no-underline">Guia de tamanhos</button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[52px] h-12 px-4 border text-sm font-medium transition-all rounded-lg ${
                        selectedSize === size
                          ? 'bg-brand-dark text-white border-brand-dark scale-105'
                          : 'border-gray-200 text-brand-charcoal hover:border-brand-dark'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-orange-500 mt-2 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    Selecione um tamanho para comprar
                  </p>
                )}
              </div>

              {/* Quantidade */}
              <div className="mb-6">
                <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark mb-3">Quantidade</h3>
                <div className="inline-flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg rounded-l-lg"
                  >−</button>
                  <span className="w-12 h-12 flex items-center justify-center border-x border-gray-200 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg rounded-r-lg"
                  >+</button>
                </div>
              </div>

              {/* Botões desktop */}
              <div className="hidden md:flex flex-col gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`w-full py-4 text-base tracking-widest uppercase font-medium transition-all ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'btn-primary disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  {added ? 'Adicionado! ✓' : 'Adicionar ao carrinho'}
                </button>
                <a
                  href={`https://wa.me/5500000000000?text=${whatsMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full py-4 text-base flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Comprar pelo WhatsApp
                </a>
              </div>

              {/* Info extras */}
              <div className="space-y-3 pb-6 border-b border-gray-100">
                {[
                  { icon: '🚚', text: 'Frete grátis acima de R$ 199' },
                  { icon: '🔄', text: 'Troca grátis em até 30 dias' },
                  { icon: '🔒', text: 'Pagamento 100% seguro' },
                  { icon: '⚡', text: 'Envio em até 24h úteis' },
                ].map((info) => (
                  <div key={info.text} className="flex items-center gap-3">
                    <span className="text-base">{info.icon}</span>
                    <span className="text-sm text-gray-600">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Descrição */}
              <div className="pt-6">
                <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark mb-4">Descrição</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barra fixa mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-40 p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className={`text-lg font-bold ${product.originalPrice ? 'text-red-500' : 'text-brand-dark'}`}>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-[10px] text-green-600 font-medium">
            R$ {(product.price * 0.9).toFixed(2).replace('.', ',')} no Pix
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`flex-1 py-3.5 text-xs tracking-widest uppercase font-medium transition-all rounded-lg ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-brand-dark text-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]'
          }`}
        >
          {added ? 'Adicionado! ✓' : selectedSize ? 'Comprar' : 'Selecione tam.'}
        </button>
      </div>

      {/* Produtos relacionados */}
      <section className="py-16 md:py-24 bg-brand-cream/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title">
              Complete seu <span className="italic font-light">look</span>
            </h2>
            <p className="section-subtitle">Combina perfeitamente com sua escolha</p>
          </div>
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  )
}
