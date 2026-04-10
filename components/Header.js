'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'

const navLinks = [
  { href: '/', label: 'Novidades' },
  { href: '/', label: 'Roupas' },
  { href: '/', label: 'Calçados' },
  { href: '/', label: 'Acessórios' },
  { href: '/', label: 'Promoções', highlight: true },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, setIsOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Barra de destaque */}
      <div className="bg-brand-dark text-white text-center py-2 px-4">
        <p className="text-[10px] md:text-xs tracking-widest uppercase font-light">
          Frete grátis acima de R$ 199 | Parcele em até 6x sem juros
        </p>
      </div>

      {/* Header principal */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Menu mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-display text-lg md:text-2xl tracking-tight text-brand-dark">
                <span className="font-semibold">Plataforma</span>
                <span className="font-light italic ml-1">Boutique</span>
              </h1>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs tracking-widest uppercase font-medium transition-colors duration-200 hover:text-brand-pink-dark ${
                    link.highlight ? 'text-red-500' : 'text-brand-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Ícones */}
            <div className="flex items-center gap-0.5 md:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Buscar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              <Link
                href="/"
                className="hidden md:flex p-2 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Minha conta"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>

              {/* Carrinho */}
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors relative"
                aria-label="Carrinho"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold animate-pulse-soft">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Barra de busca */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down border-t">
            <div className="container-custom py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  className="w-full py-3 pl-12 pr-4 border border-gray-200 text-sm focus:outline-none focus:border-brand-dark transition-colors"
                  autoFocus
                />
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <button onClick={() => setSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Menu mobile overlay */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-display text-lg">
                <span className="font-semibold">Plataforma</span>
                <span className="font-light italic ml-1">Boutique</span>
              </span>
              <button onClick={() => setMenuOpen(false)} className="p-1" aria-label="Fechar">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3.5 text-sm tracking-widest uppercase font-medium border-b border-gray-100 transition-colors ${
                    link.highlight ? 'text-red-500' : 'text-brand-charcoal hover:text-brand-pink-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-6 border-t mt-4">
              <Link href="/" className="flex items-center gap-3 py-3 text-sm text-gray-600 hover:text-brand-dark">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Minha Conta
              </Link>
              <Link href="/" className="flex items-center gap-3 py-3 text-sm text-gray-600 hover:text-brand-dark">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Lista de Desejos
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
