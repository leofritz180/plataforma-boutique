'use client'

import Link from 'next/link'

const categories = [
  { name: 'Vestidos', slug: 'vestidos', emoji: '👗' },
  { name: 'Blusas', slug: 'blusas', emoji: '👚' },
  { name: 'Calças', slug: 'calcas', emoji: '👖' },
  { name: 'Saias', slug: 'saias', emoji: '🩱' },
  { name: 'Conjuntos', slug: 'conjuntos', emoji: '✨' },
  { name: 'Calçados', slug: 'calcados', emoji: '👡' },
  { name: 'Bolsas', slug: 'acessorios', emoji: '👜' },
  { name: 'Acessórios', slug: 'acessorios', emoji: '💍' },
]

export default function CategoryBar() {
  return (
    <section className="py-10 md:py-14">
      <div className="container-custom">
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/produtos?categoria=${cat.slug}`}
              className="flex flex-col items-center gap-2 min-w-[72px] group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-nude-light rounded-full flex items-center justify-center text-2xl group-hover:bg-brand-pink-light transition-colors group-hover:scale-105 transform duration-200">
                {cat.emoji}
              </div>
              <span className="text-2xs md:text-xs text-gray-600 group-hover:text-brand-dark transition-colors whitespace-nowrap font-medium">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
