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
  'FRETE GRÁTIS ACIMA DE R$199 | PARCELE EM ATÉ 6X SEM JUROS',
  'TROCA GRÁTIS EM 7 DIAS | COMPRA 100% SEGURA',
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

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoTexts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push('/produtos')
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* === TOP BAR === */}
      <div className="bg-black text-white/80 overflow-hidden">
        <div className="container-custom py-2">
          <div className="relative h-4 flex items-center justify-center">
            <p
              key={promoIndex}
              className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-light animate-fade-in-up absolute"
            >
              {promoTexts[promoIndex]}
            </p>
          </div>
        </div>
      </div>

      {/* === HEADER PRINCIPAL === */}
      <header className={`sticky top-0 z-50 bg-black transition-all duration-300 ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : ''}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-[60px] md:h-[68px] gap-4">

            {/* ESQUERDA */}
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>

              {/* Busca desktop */}
              <div className="hidden lg:block flex-1 max-w-sm">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Olá, o que você procura?"
                    className="w-full py-2.5 pl-10 pr-4 bg-white/10 border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/25 transition-all"
                  />
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                </form>
              </div>
            </div>

            {/* CENTRO: Logo */}
            <Link href="/" className="flex-shrink-0 text-center">
              <h1 className="font-display text-[22px] md:text-[28px] tracking-[0.02em] text-white leading-none">
                <span className="font-semibold">Plataforma</span>
                <span className="font-light italic ml-1.5 text-white/80">Boutique</span>
              </h1>
            </Link>

            {/* DIREITA */}
            <div className="flex items-center justify-end gap-1 md:gap-1.5 flex-1">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen)
                  setTimeout(() => searchInputRef.current?.focus(), 100)
                }}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>

              <Link
                href="/produtos?filtro=favoritos"
                className="hidden md:flex p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Favoritos"
              >
                <Heart className="w-5 h-5 text-white" strokeWidth={1.5} />
              </Link>

              <Link
                href="/conta"
                className="hidden md:flex p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Minha conta"
              >
                <User className="w-5 h-5 text-white" strokeWidth={1.5} />
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
                aria-label="Carrinho"
              >
                <ShoppingBag className="w-5 h-5 text-white" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-pink text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* === MENU CATEGORIAS DESKTOP === */}
        <nav className="hidden lg:block border-t border-white/10">
          <div className="container-custom">
            <div className="flex items-center justify-center gap-10 h-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[12px] tracking-[0.15em] uppercase font-medium transition-colors duration-200 relative group ${
                    link.highlight
                      ? 'text-brand-pink hover:text-brand-pink-light'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-[8px] left-0 right-0 h-[2px] transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100 ${
                    link.highlight ? 'bg-brand-pink' : 'bg-white'
                  }`} />
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* === BUSCA MOBILE === */}
        {searchOpen && (
          <div className="lg:hidden border-t border-white/10 animate-slide-down bg-black">
            <div className="container-custom py-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Olá, o que você procura?"
                  className="w-full py-3 pl-11 pr-12 bg-white/10 border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/25 transition-all"
                />
                <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/70"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* === MENU MOBILE === */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div
            className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-black z-[70] lg:hidden overflow-y-auto flex flex-col"
            style={{ animation: 'slideInLeft 0.3s ease-out forwards' }}
          >
            {/* Header menu */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <span className="font-display text-lg text-white">
                <span className="font-semibold">Plataforma</span>
                <span className="font-light italic ml-1 text-white/70">Boutique</span>
              </span>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg" aria-label="Fechar">
                <X className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>
            </div>

            {/* Busca */}
            <div className="p-5 border-b border-white/10">
              <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="O que você procura?"
                  className="w-full py-2.5 pl-10 pr-4 bg-white/10 border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/15 transition-all"
                />
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
              </form>
            </div>

            {/* Links */}
            <nav className="flex-1 p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium mb-3">Categorias</p>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-3.5 border-b border-white/5 transition-colors ${
                    link.highlight
                      ? 'text-brand-pink font-semibold'
                      : 'text-white/70 hover:text-white font-medium'
                  }`}
                >
                  <span className="text-sm tracking-wide">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                </Link>
              ))}
            </nav>

            {/* Footer menu */}
            <div className="p-5 border-t border-white/10">
              <Link href="/conta" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <User className="w-4 h-4" strokeWidth={1.5} />
                Minha Conta
              </Link>
              <Link href="/produtos?filtro=favoritos" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                Favoritos
              </Link>
              <Link href="/checkout" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-2.5 text-sm text-white/50 hover:text-white transition-colors">
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
