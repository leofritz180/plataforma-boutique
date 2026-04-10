'use client'

import { useCart } from '@/lib/CartContext'
import Link from 'next/link'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-display text-lg">
            Sacola <span className="text-sm text-gray-400 font-sans">({totalItems})</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-gray-400 text-sm mb-6">Sua sacola está vazia</p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary inline-block"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4">
                  {/* Thumb */}
                  <div className="w-20 h-24 bg-gradient-to-br from-brand-nude-light to-brand-pink-light rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-pink/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-brand-dark truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">Tam: {item.size}</p>
                    <p className="text-sm font-bold text-brand-dark mt-1">
                      R$ {item.product.price.toFixed(2).replace('.', ',')}
                    </p>

                    {/* Quantidade */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="inline-flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-medium border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-5 space-y-4">
            {/* Frete grátis */}
            {totalPrice < 199 ? (
              <div className="bg-brand-cream rounded-lg p-3">
                <p className="text-xs text-gray-600 text-center">
                  Falta <strong>R$ {(199 - totalPrice).toFixed(2).replace('.', ',')}</strong> para frete grátis!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (totalPrice / 199) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xs text-green-600 font-medium">Parabéns! Você tem frete grátis! 🎉</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-xl font-bold text-brand-dark">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <p className="text-xs text-green-600 text-right font-medium">
              R$ {(totalPrice * 0.9).toFixed(2).replace('.', ',')} no Pix (10% off)
            </p>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full block text-center py-4 text-base"
            >
              Finalizar compra
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xs text-gray-500 hover:text-brand-dark transition-colors py-2"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
