'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import { Wallet, CreditCard, FileText } from 'lucide-react'

export default function CheckoutPage() {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
  const [step, setStep] = useState('cart') // cart -> checkout -> success
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    payment: 'pix',
  })

  const shipping = totalPrice >= 199 ? 0 : 14.90
  const pixDiscount = form.payment === 'pix' ? totalPrice * 0.1 : 0
  const finalTotal = totalPrice + shipping - pixDiscount

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStep('success')
    clearCart()
  }

  // Carrinho vazio
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container-custom py-24 text-center">
        <svg className="w-20 h-20 text-gray-200 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        <h2 className="font-display text-2xl text-brand-dark mb-3">Sua sacola está vazia</h2>
        <p className="text-gray-500 text-sm mb-8">Adicione produtos para continuar</p>
        <Link href="/" className="btn-primary inline-block">Explorar a loja</Link>
      </div>
    )
  }

  // Sucesso
  if (step === 'success') {
    return (
      <div className="container-custom py-24 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-brand-dark mb-3">Pedido realizado!</h2>
        <p className="text-gray-500 text-sm mb-2">Obrigada pela sua compra!</p>
        <p className="text-gray-500 text-sm mb-8">Você receberá os detalhes por WhatsApp em instantes.</p>
        <Link href="/" className="btn-primary inline-block">Continuar comprando</Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
          <span>/</span>
          <span className={step === 'cart' ? 'text-brand-dark font-medium' : 'text-gray-400'}>Sacola</span>
          <span>/</span>
          <span className={step === 'checkout' ? 'text-brand-dark font-medium' : 'text-gray-400'}>Checkout</span>
        </nav>

        <h1 className="font-display text-2xl md:text-3xl text-brand-dark mb-8">
          {step === 'cart' ? 'Sua sacola' : 'Finalizar compra'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            {step === 'cart' ? (
              /* === CARRINHO === */
              <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-24 h-28 md:w-28 md:h-32 bg-gradient-to-br from-brand-nude-light to-brand-pink-light rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg className="w-10 h-10 text-brand-pink/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-brand-dark mb-1 truncate">{item.product.name}</h3>
                        <p className="text-xs text-gray-400 mb-2">Tamanho: {item.size}</p>
                        <p className="text-base font-bold text-brand-dark">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="inline-flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="w-9 h-9 flex items-center justify-center text-sm hover:bg-gray-50 rounded-l-lg"
                            >−</button>
                            <span className="w-9 h-9 flex items-center justify-center text-xs font-medium border-x border-gray-200">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="w-9 h-9 flex items-center justify-center text-sm hover:bg-gray-50 rounded-r-lg"
                            >+</button>
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
              </div>
            ) : (
              /* === CHECKOUT FORM === */
              <form onSubmit={handleSubmit} id="checkout-form">
                {/* Dados pessoais */}
                <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm mb-6">
                  <h2 className="text-sm tracking-widest uppercase font-medium text-brand-dark mb-5">Seus dados</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1.5">Nome completo *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Telefone (WhatsApp) *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm mb-6">
                  <h2 className="text-sm tracking-widest uppercase font-medium text-brand-dark mb-5">Endereço de entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">CEP *</label>
                      <input
                        type="text"
                        name="cep"
                        required
                        value={form.cep}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="00000-000"
                      />
                    </div>
                    <div className="hidden md:block" />
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1.5">Endereço *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={form.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="Rua, Avenida..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Número *</label>
                      <input
                        type="text"
                        name="number"
                        required
                        value={form.number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="123"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Complemento</label>
                      <input
                        type="text"
                        name="complement"
                        value={form.complement}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="Apto, Bloco..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Bairro *</label>
                      <input
                        type="text"
                        name="neighborhood"
                        required
                        value={form.neighborhood}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="Bairro"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Cidade *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        placeholder="Cidade"
                      />
                    </div>
                  </div>
                </div>

                {/* Pagamento */}
                <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm">
                  <h2 className="text-sm tracking-widest uppercase font-medium text-brand-dark mb-5">Pagamento</h2>
                  <div className="space-y-3">
                    {[
                      { value: 'pix', label: 'Pix', desc: '10% de desconto', Icon: Wallet },
                      { value: 'credit', label: 'Cartão de crédito', desc: 'até 6x sem juros', Icon: CreditCard },
                      { value: 'boleto', label: 'Boleto bancário', desc: '3 dias úteis', Icon: FileText },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                          form.payment === method.value
                            ? 'border-brand-dark bg-brand-cream/50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.value}
                          checked={form.payment === method.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          form.payment === method.value ? 'border-brand-dark' : 'border-gray-300'
                        }`}>
                          {form.payment === method.value && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-dark" />
                          )}
                        </div>
                        <method.Icon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-brand-dark">{method.label}</p>
                          <p className="text-xs text-gray-400">{method.desc}</p>
                        </div>
                        {method.value === 'pix' && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded font-medium">-10%</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Resumo lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm sticky top-24">
              <h2 className="text-sm tracking-widest uppercase font-medium text-brand-dark mb-5">Resumo do pedido</h2>

              {/* Items resumo */}
              <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 truncate max-w-[180px]">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium text-brand-dark whitespace-nowrap ml-2">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div className="space-y-2 mb-5 pb-5 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-brand-dark">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Frete</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-brand-dark'}>
                    {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                {pixDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Desconto Pix</span>
                    <span className="text-green-600 font-medium">- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-baseline mb-6">
                <span className="text-sm text-gray-500">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-brand-dark">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    ou 6x de R$ {(finalTotal / 6).toFixed(2).replace('.', ',')} s/ juros
                  </p>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="btn-primary w-full py-4 text-base"
                >
                  Ir para o checkout
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  className="btn-primary w-full py-4 text-base"
                >
                  Confirmar pedido
                </button>
              )}

              {step === 'checkout' && (
                <button
                  onClick={() => setStep('cart')}
                  className="w-full text-center text-xs text-gray-500 hover:text-brand-dark transition-colors py-3 mt-2"
                >
                  ← Voltar para a sacola
                </button>
              )}

              {/* Segurança */}
              <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] text-gray-400">Compra 100% segura e criptografada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
