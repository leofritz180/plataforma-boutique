import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { CartProvider } from '@/lib/CartContext'

export const metadata = {
  title: 'Plataforma Boutique | Moda Feminina Online',
  description: 'Moda feminina com estilo, qualidade e preço justo. Roupas, calçados e acessórios para o seu dia a dia e ocasiões especiais.',
  keywords: 'moda feminina, roupas femininas, loja online, boutique, vestidos, blusas, calçados',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
