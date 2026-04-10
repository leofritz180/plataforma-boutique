'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Gift, Package, Heart } from 'lucide-react'

export default function ContaPage() {
  const [tab, setTab] = useState('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [success, setSuccess] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    setSuccess(true)
  }

  function handleRegister(e) {
    e.preventDefault()
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="container-custom py-24 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-brand-dark mb-3">
          {tab === 'login' ? 'Bem-vinda de volta!' : 'Conta criada com sucesso!'}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          {tab === 'login' ? 'Você está logada.' : 'Agora você pode aproveitar nossas ofertas exclusivas.'}
        </p>
        <Link href="/produtos" className="btn-primary inline-block">
          Explorar a loja
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12 md:py-20">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <h2 className="font-display text-2xl text-brand-dark">
                <span className="font-semibold">Plataforma</span>
                <span className="font-light italic ml-1">Boutique</span>
              </h2>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 bg-white rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-3 text-sm font-medium tracking-wide rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-brand-dark text-white'
                  : 'text-gray-500 hover:text-brand-dark'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-3 text-sm font-medium tracking-wide rounded-lg transition-all ${
                tab === 'register'
                  ? 'bg-brand-dark text-white'
                  : 'text-gray-500 hover:text-brand-dark'
              }`}
            >
              Criar conta
            </button>
          </div>

          {/* Login */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-xl text-brand-dark mb-6">Acesse sua conta</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">E-mail</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Senha</label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                    placeholder="Sua senha"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-6 py-3.5">
                Entrar
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Esqueceu a senha? <button type="button" className="text-brand-pink-dark underline">Recuperar</button>
              </p>
            </form>
          )}

          {/* Registro */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-xl text-brand-dark mb-6">Crie sua conta</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Nome completo</label>
                  <input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">E-mail</label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Telefone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Senha</label>
                  <input
                    type="password"
                    required
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark transition-colors"
                    placeholder="Crie uma senha"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-6 py-3.5">
                Criar conta
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Ao criar sua conta, você concorda com nossos termos de uso.
              </p>
            </form>
          )}

          {/* Benefícios */}
          <div className="mt-8 space-y-3">
            {[
              { Icon: Gift, text: '10% de desconto na primeira compra' },
              { Icon: Package, text: 'Acompanhe seus pedidos' },
              { Icon: Heart, text: 'Salve seus produtos favoritos' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm">
                <item.Icon className="w-5 h-5 text-brand-pink-dark flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
