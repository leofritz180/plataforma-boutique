'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { products } from '@/lib/data'
import Link from 'next/link'

const categories = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'vestidos', label: 'Vestidos' },
  { slug: 'blusas', label: 'Blusas' },
  { slug: 'calcas', label: 'Calças' },
  { slug: 'saias', label: 'Saias' },
  { slug: 'conjuntos', label: 'Conjuntos' },
  { slug: 'shorts', label: 'Shorts' },
  { slug: 'blazers', label: 'Blazers' },
  { slug: 'macacao', label: 'Macacões' },
  { slug: 'calcados', label: 'Calçados' },
  { slug: 'acessorios', label: 'Acessórios' },
]

const sortOptions = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'mais-vendidos', label: 'Mais vendidos' },
]

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-custom py-24 text-center text-gray-400">Carregando...</div>}>
      <ProductsContent />
    </Suspense>
  )
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('categoria') || 'todos'
  const filterParam = searchParams.get('filtro') || ''

  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [sort, setSort] = useState('relevancia')

  // Sincronizar com URL quando navega via Link
  useEffect(() => {
    setActiveCategory(categoryParam)
  }, [categoryParam])

  const filtered = useMemo(() => {
    let result = [...products]

    // Filtro por categoria
    if (activeCategory !== 'todos') {
      result = result.filter((p) => p.category === activeCategory)
    }

    // Filtros especiais
    if (filterParam === 'novidades') {
      result = products.filter((p) => p.tag === 'Novo')
    } else if (filterParam === 'promocoes') {
      result = products.filter((p) => p.tag === 'Promo')
    } else if (filterParam === 'mais-vendidos') {
      result = products.filter((p) => p.badge === 'Mais vendido')
    } else if (filterParam === 'favoritos') {
      result = products.filter((p) => p.badge === 'Favorito')
    }

    // Ordenação
    if (sort === 'menor-preco') {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === 'maior-preco') {
      result.sort((a, b) => b.price - a.price)
    } else if (sort === 'mais-vendidos') {
      result.sort((a, b) => (b.sold || 0) - (a.sold || 0))
    }

    return result
  }, [activeCategory, filterParam, sort])

  const pageTitle = filterParam === 'novidades'
    ? 'Novidades'
    : filterParam === 'promocoes'
    ? 'Promoções'
    : filterParam === 'mais-vendidos'
    ? 'Mais Vendidos'
    : filterParam === 'favoritos'
    ? 'Favoritos'
    : activeCategory !== 'todos'
    ? categories.find((c) => c.slug === activeCategory)?.label || 'Produtos'
    : 'Todos os Produtos'

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-brand-cream/50">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-dark">{pageTitle}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        {/* Título */}
        <div className="mb-8">
          <h1 className="section-title">{pageTitle}</h1>
          <p className="text-sm text-gray-500 mt-2">{filtered.length} produtos encontrados</p>
        </div>

        {/* Categorias scroll */}
        {!filterParam && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-medium whitespace-nowrap rounded-full transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-brand-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Ordenação */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Ordenar por:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-dark bg-white"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm mb-4">Nenhum produto encontrado nesta categoria.</p>
            <button
              onClick={() => setActiveCategory('todos')}
              className="btn-outline inline-block"
            >
              Ver todos os produtos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
