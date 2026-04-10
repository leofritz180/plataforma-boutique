'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useToast } from '@/components/Toast'

const CartContext = createContext()

const STORAGE_KEY = 'plataforma-boutique-cart'

function loadCart() {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { addToast } = useToast()

  // Carregar do localStorage
  useEffect(() => {
    setItems(loadCart())
    setLoaded(true)
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    if (loaded) saveCart(items)
  }, [items, loaded])

  const addItem = useCallback((product, size, quantity = 1) => {
    setItems((prev) => {
      const key = `${product.id}-${size}`
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { key, product, size, quantity }]
    })
    setIsOpen(true)
    addToast(`${product.name} adicionado à sacola!`)
  }, [addToast])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
    addToast('Produto removido da sacola', 'info')
  }, [addToast])

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.key !== key))
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    saveCart([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
