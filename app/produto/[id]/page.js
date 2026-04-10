'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import { getProductById, getRelatedProducts } from '@/lib/data'

export default function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const related = getRelatedProducts(id, 4)

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container-custom py-32 text-center">
        <h2 className="font-display text-2xl text-brand-dark mb-4">Produto não encontrado</h2>
        <Link href="/" className="btn-primary inline-block">
          Voltar à loja
        </Link>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Simulação de galeria (4 ângulos)
  const gallery = [
    { label: 'Frente' },
    { label: 'Costas' },
    { label: 'Detalhe' },
    { label: 'Modelo' },
  ]

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
            <span className="text-brand-dark">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Produto */}
      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Galeria */}
            <div>
              {/* Imagem principal */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-brand-nude-light via-brand-cream to-brand-pink-light rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                {product.tag && (
                  <span className={`absolute top-4 left-4 px-3 py-1 text-2xs tracking-wider uppercase font-medium z-10 ${
                    product.tag === 'Novo' ? 'bg-brand-dark text-white' :
                    product.tag === 'Promo' ? 'bg-red-500 text-white' :
                    'bg-white text-brand-dark'
                  }`}>
                    {product.tag === 'Promo' && discount > 0 ? `-${discount}%` : product.tag}
                  </span>
                )}
                <div className="text-center">
                  <svg className="w-24 h-24 text-brand-pink/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-sm text-brand-pink-dark/40">{gallery[selectedImage].label}</p>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gradient-to-br from-brand-nude-light to-brand-pink-light rounded-lg flex items-center justify-center transition-all ${
                      selectedImage === idx
                        ? 'ring-2 ring-brand-dark ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <span className="text-2xs text-brand-pink-dark/50">{img.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Informações */}
            <div className="lg:py-4">
              {/* Categoria */}
              <span className="text-xs tracking-[0.2em] uppercase text-brand-pink-dark font-medium">
                {product.category}
              </span>

              {/* Nome */}
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-brand-dark mt-2 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Avaliações */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-400">(47 avaliações)</span>
              </div>

              {/* Preço */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through block mb-1">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <div className="flex items-baseline gap-3">
                  <span className={`text-3xl md:text-4xl font-semibold ${product.originalPrice ? 'text-red-500' : 'text-brand-dark'}`}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {discount > 0 && (
                    <span className="text-sm bg-red-50 text-red-500 px-2 py-0.5 rounded font-medium">
                      -{discount}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  até <strong>6x de R$ {(product.price / 6).toFixed(2).replace('.', ',')}</strong> sem juros
                </p>
                <p className="text-sm text-green-600 mt-1 font-medium">
                  R$ {(product.price * 0.9).toFixed(2).replace('.', ',')} no Pix (10% off)
                </p>
              </div>

              {/* Cores */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark mb-3">
                    Cor
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          idx === 0 ? 'border-brand-dark scale-110' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tamanhos */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark">
                    Tamanho
                  </h3>
                  <button className="text-xs text-brand-pink-dark underline hover:no-underline">
                    Guia de tamanhos
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 px-4 border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-brand-dark text-white border-brand-dark'
                          : 'border-gray-200 text-brand-charcoal hover:border-brand-dark'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-red-400 mt-2">Selecione um tamanho</p>
                )}
              </div>

              {/* Quantidade */}
              <div className="mb-8">
                <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark mb-3">
                  Quantidade
                </h3>
                <div className="inline-flex items-center border border-gray-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center border-x border-gray-200 text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col gap-3 mb-8">
                <button
                  className="btn-primary w-full py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!selectedSize}
                >
                  Adicionar ao carrinho
                </button>
                <button className="btn-outline w-full py-4 text-base flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  Adicionar à lista de desejos
                </button>
              </div>

              {/* Info extras */}
              <div className="space-y-4 pb-8 border-b border-gray-100">
                {[
                  { icon: '🚚', text: 'Frete grátis acima de R$ 199' },
                  { icon: '🔄', text: 'Troca grátis em até 30 dias' },
                  { icon: '🔒', text: 'Pagamento 100% seguro' },
                ].map((info) => (
                  <div key={info.text} className="flex items-center gap-3">
                    <span>{info.icon}</span>
                    <span className="text-sm text-gray-600">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Descrição */}
              <div className="pt-8">
                <h3 className="text-xs tracking-widest uppercase font-medium text-brand-dark mb-4">
                  Descrição
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos relacionados */}
      <section className="py-16 md:py-24 bg-brand-cream/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title">
              Você também pode <span className="italic font-light">gostar</span>
            </h2>
          </div>
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  )
}
