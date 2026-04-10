'use client'

import { socialProof } from '@/lib/data'

export default function ProvaSocial() {
  return (
    <section className="py-16 md:py-24 bg-brand-cream/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Quem usa, <span className="italic font-light">ama</span> 💖
          </h2>
          <p className="section-subtitle">
            +5.000 clientes satisfeitas em todo o Brasil
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          {[
            { value: '4.9', label: 'Nota média' },
            { value: '5mil+', label: 'Clientes' },
            { value: '98%', label: 'Recomendam' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-brand-dark">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {socialProof.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-100 hover:border-brand-pink/30 hover:shadow-md transition-all rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-brand-pink-light to-brand-pink rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {item.name.charAt(1).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">{item.name}</p>
                  <p className="text-[10px] text-gray-400">Comprou: {item.product}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Verificado */}
              <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-50">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] text-green-600 font-medium">Compra verificada</span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-3">Siga a gente no Instagram</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-dark font-medium text-sm hover:text-brand-pink-dark transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @plataformaboutique
          </a>
        </div>
      </div>
    </section>
  )
}
