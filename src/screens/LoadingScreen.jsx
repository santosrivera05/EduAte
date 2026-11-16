import { useEffect, useMemo } from 'react'
import { PizzaLogo } from '../components/Icons'

const OUTER = '🍎 🍓 🌶️ 🍒 🍅 🥕 🍊 🍑 🥭 🍌 🌽 🍋 🍐 🥝 🥒 🥦 🥬 🫛 🫑 🍇 🫐 🍆 🧅 🍉'.split(' ')
const INNER = '🍒 🫑 🍊 🥔 🍋 🥦 🍏 🥒 🍇 🫐 🍆 🥬 🍈 🥥'.split(' ')

function arc(list, rx, ry, size, offset) {
  return list.map((e, i) => {
    const t = Math.PI - (i / (list.length - 1)) * Math.PI
    return {
      e,
      x: 50 + Math.cos(t) * rx,
      y: 92 - Math.sin(t) * ry,
      size: size + ((i * 7) % 3) * 0.7,
      rot: ((i * 37) % 50) - 25,
      delay: offset + i * 45,
    }
  })
}

export default function LoadingScreen({ onDone }) {
  const produce = useMemo(() => [...arc(OUTER, 47, 84, 5.2, 0), ...arc(INNER, 39, 68, 4.4, 300)], [])

  useEffect(() => {
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <button
      onClick={onDone}
      className="absolute inset-0 overflow-hidden bg-loader text-left"
      aria-label="Start Edu-Ate"
    >
      {produce.map((p, i) => (
        <span
          key={i}
          className="emoji absolute animate-pop"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}cqw`,
            animationDelay: `${p.delay}ms`,
            translate: '-50% -50%',
            rotate: `${p.rot}deg`,
          }}
          aria-hidden="true"
        >
          {p.e}
        </span>
      ))}

      <h1
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 animate-rise font-hand text-[15cqw] leading-none text-white drop-shadow-[0_0.4cqw_0.6cqw_rgba(0,0,0,0.25)]"
        style={{ animationDelay: '900ms' }}
      >
        Edu-Ate
      </h1>

      <div
        className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 animate-fade flex-col items-center gap-[0.8cqw]"
        style={{ animationDelay: '1300ms' }}
      >
        <PizzaLogo className="w-[5cqw] animate-float" />
        <span className="font-poppins text-[1.3cqw] font-medium tracking-wide text-white">FREE PIZZA STUDIOS</span>
      </div>
    </button>
  )
}
