'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import { Search, User, ShoppingBag, Menu, X, Heart, ChevronRight } from 'lucide-react'

const navLinks = [
  { href: '/produtos?filtro=novidades', label: 'Novidades' },
  { href: '/produtos?categoria=vestidos', label: 'Roupas' },
  { href: '/produtos?categoria=calcados', label: 'Calçados' },
  { href: '/produtos?categoria=acessorios', label: 'Acessórios' },
  { href: '/produtos?filtro=promocoes', label: 'Promoções', highlight: true },
]

const promoTexts = [
  'FRETE GRÁTIS ACIMA DE R$199',
  'PARCELE EM ATÉ 6X SEM JUROS',
  'TROCA GRÁTIS EM 30 DIAS',
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [promoIndex, setPromoIndex] = useState(0)
  const { totalItems, setIsOpen } = useCart()
  const router = useRouter()
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Rotação do texto promocional
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoTexts.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Lock body scroll no menu mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/produtos`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* === TOP BAR === */}
      <div className="bg-brand-dark text-white overflow-hidden">
        <div className="container-custom py-2">
          <div className="relative h-4 flex items-center justify-center">
            <p
              key={promoIndex}
              className="text-[10px] md:text-xs tracking-[0.15em] uppercase font-medium animate-fade-in-up absolute"
            >
              {promoTexts[promoIndex]}
            </p>
          </div>
        </div>
      </div>

      {/* === HEADER PRINCIPAL === */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        {/* Linha principal */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">

            {/* ESQUERDA: Hamburger mobile / Busca desktop */}
            <div className="flex items-center gap-2 flex-1">
              {/* Hamburger mobile */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5 text-brand-dark" strokeWidth={1.5} />
              </button>

              {/* Busca desktop */}
              <div className="hidden lg:block flex-1 max-w-md">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Olá, o que você procura?"
                    className="w-full py-2.5 pl-11 pr-4 bg-gray-50 border border-gray-100 rounded-full text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-pink focus:bg-white transition-all"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                </form>
              </div>
            </div>

            {/* CENTRO: Logo */}
            <Link href="/" className="flex-shrink-0 text-center">
              <h1 className="font-display text-xl md:text-[26px] tracking-tight text-brand-dark leading-none">
                <span className="font-semibold">Plataforma</span>
                <span className="font-light italic ml-1.5">Boutique</span>
              </h1>
            </Link>

            {/* DIREITA: Ícones */}
            <div className="flex items-center justify-end gap-1 md:gap-2 flex-1">
              {/* Busca mobile */}
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen)
                  setTimeout(() => searchInputRef.current?.focus(), 100)
                }}
                className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5 text-brand-dark" strokeWidth={1.5} />
              </button>

              {/* Favoritos desktop */}
              <Link
                href="/produtos?filtro=favoritos"
                className="hidden md:flex p-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Favoritos"
              >
                <Heart className="w-5 h-5 text-brand-dark" strokeWidth={1.5} />
              </Link>

              {/* Conta */}
              <Link
                href="/conta"
                className="hidden md:flex p-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Minha conta"
              >
                <User className="w-5 h-5 text-brand-dark" strokeWidth={1.5} />
              </Link>

              {/* Carrinho */}
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors relative"
                aria-label="Carrinho"
              >
                <ShoppingBag className="w-5 h-5 text-brand-dark" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* === MENU DE CATEGORIAS DESKTOP === */}
        <nav className="hidden lg:block border-t border-gray-100">
          <div className="container-custom">
            <div className="flex items-center justify-center gap-10 h-11">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-200 relative group ${
                    link.highlight
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-600 hover:text-brand-dark'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-[9px] left-0 right-0 h-[2px] transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100 ${
                    link.highlight ? 'bg-red-500' : 'bg-brand-dark'
                  }`} />
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* === BARRA DE BUSCA MOBILE === */}
        {searchOpen && (
          <div className="lg:hidden border-t border-gray-100 animate-slide-down">
            <div className="container-custom py-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Olá, o que você procura?"
                  className="w-full py-3 pl-11 pr-12 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:border-brand-pink focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* === MENU MOBILE OVERLAY === */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60] lg:hidden" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-[70] lg:hidden overflow-y-auto animate-slide-in-right flex flex-col" style={{ animationName: 'slideInLeft' }}>
            {/* Header do menu */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-display text-lg text-brand-dark">
                <span className="font-semibold">Plataforma</span>
                <span className="font-light italic ml-1">Boutique</span>
              </span>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg" aria-label="Fechar">
                <X className="w-5 h-5 text-brand-dark" strokeWidth={1.5} />
              </button>
            </div>

            {/* Busca no menu */}
            <div className="p-5 border-b border-gray-100">
              <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="O que você procura?"
                  className="w-full py-2.5 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:border-brand-pink transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
              </form>
            </div>

            {/* Links */}
            <nav className="flex-1 p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium mb-3">Categorias</p>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-3.5 border-b border-gray-50 transition-colors ${
                    link.highlight
                      ? 'text-red-500 font-semibold'
                      : 'text-brand-charcoal hover:text-brand-dark font-medium'
                  }`}
                >
                  <span className="text-sm tracking-wide">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                </Link>
              ))}
            </nav>

            {/* Footer menu */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
              <Link
                href="/conta"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-600 hover:text-brand-dark transition-colors"
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                Minha Conta
              </Link>
              <Link
                href="/produtos?filtro=favoritos"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-600 hover:text-brand-dark transition-colors"
              >
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                Favoritos
              </Link>
              <Link
                href="/checkout"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-600 hover:text-brand-dark transition-colors"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                Minha Sacola
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
