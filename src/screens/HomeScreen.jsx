import { useState } from 'react'
import { Book, Controller, Hamburger, MenuCard } from '../components/Icons'
import { SideLinks } from '../components/SideMenu'

export default function HomeScreen({ onNavigate, onInfo, newMeals }) {
  const [sidebar, setSidebar] = useState(true)

  const items = [
    { id: 'play', label: 'Play', icon: <Controller className="w-[11cqw]" />, color: 'text-cream' },
    { id: 'learn', label: 'Learn', icon: <Book className="w-[13cqw]" />, color: 'text-[#d6e6ee]' },
    { id: 'menu', label: 'My Menu', icon: <MenuCard className="w-[10cqw]" />, color: 'text-cream' },
  ]

  return (
    <div className="absolute inset-0 flex bg-home">
      <main className="flex flex-1 flex-col items-center justify-evenly py-[2cqw]">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group relative flex animate-rise flex-col items-center transition"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="transition duration-300 group-hover:-translate-y-[0.6cqw] group-hover:rotate-[-4deg] group-active:scale-95">
              {item.icon}
            </span>
            <span className={`font-hand text-[5.4cqw] leading-[1.05] ${item.color}`}>{item.label}</span>
            {item.id === 'menu' && newMeals > 0 && (
              <span className="absolute right-[-2cqw] top-0 rounded-full bg-[#e0262b] px-[1cqw] py-[0.2cqw] font-spartan text-[1.5cqw] font-bold text-white shadow">
                {newMeals} new
              </span>
            )}
          </button>
        ))}
      </main>

      <aside
        className={`relative bg-sidebar transition-[width] duration-300 ${sidebar ? 'w-[25.5cqw]' : 'w-[9cqw]'}`}
      >
        <div className="px-[2cqw] pt-[2cqw]">
          <button onClick={() => setSidebar((s) => !s)} aria-label="Toggle menu" aria-expanded={sidebar}>
            <Hamburger className="w-[5cqw]" />
          </button>
          <div
            className={`mt-[5.5cqw] transition-opacity duration-200 ${sidebar ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <SideLinks onInfo={onInfo} />
          </div>
        </div>
      </aside>
    </div>
  )
}
