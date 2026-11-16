import { useEffect, useState } from 'react'
import { CORE_GROUPS, FOOD_BY_ID, GROUPS } from '../data/foods'
import FoodIcon from '../components/FoodIcon'
import { Stars } from '../components/Icons'
import Plate from '../components/Plate'
import { MenuButton } from '../components/SideMenu'
import { scoreMeal } from '../lib/game'

const GROUP_ICON = {
  vegetables: FOOD_BY_ID.broccoli,
  fruits: FOOD_BY_ID.apple,
  proteins: FOOD_BY_ID.chicken,
  carbs: FOOD_BY_ID.bread,
  dairy: FOOD_BY_ID.cheese,
}

export default function LessonCompleteScreen({ meal, onContinue, onPlayAgain, onOpenMenu }) {
  const result = scoreMeal(meal.items)
  const shown = useCountUp(result.score)

  return (
    <div className="absolute inset-0 overflow-clip bg-mint">
      <MenuButton onClick={onOpenMenu} />
      <Confetti show={result.stars === 3} />

      <h1 className="absolute left-1/2 top-[7%] w-full -translate-x-1/2 animate-rise text-center font-hand text-[5cqw] leading-none">
        Nice job! You unlocked a new meal!
      </h1>

      <div className="absolute left-[5%] top-[19%] w-[52cqw]">
        <Plate items={meal.items} animate />
        <p className="mt-[0.5cqw] text-center font-hand text-[3cqw] leading-none text-sage">{meal.name}</p>
      </div>

      {/* score card */}
      <div
        className="absolute right-[4.5%] top-[19%] w-[34cqw] animate-rise rounded-[2.4cqw] bg-white/80 px-[2.4cqw] py-[1.8cqw] shadow-[0_0.6cqw_1.6cqw_rgba(0,0,0,0.08)]"
        style={{ animationDelay: '500ms' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-hand text-[3cqw] leading-none text-leaf">{result.headline}</div>
            <div className="mt-[0.4cqw] font-spartan text-[1.5cqw] text-ink/60">Balance score</div>
          </div>
          <div className="text-right font-spartan font-extrabold leading-none text-ink">
            <span className="text-[5.4cqw]">{shown}</span>
            <span className="text-[2cqw] text-ink/50">/100</span>
          </div>
        </div>
        <Stars count={result.stars} className="mt-[0.8cqw] gap-[0.6cqw]" starClass="w-[4.2cqw] animate-pop" />

        <div className="mt-[1.4cqw] font-spartan text-[1.5cqw] font-semibold text-ink/70">Food groups on your plate</div>
        <div className="mt-[0.6cqw] flex justify-between">
          {CORE_GROUPS.map((g) => {
            const has = result.covered.includes(g)
            return (
              <div key={g} className="flex flex-col items-center gap-[0.3cqw]">
                <div
                  className={`relative flex h-[5.2cqw] w-[5.2cqw] items-center justify-center rounded-full ${has ? '' : 'opacity-40 grayscale'}`}
                  style={{ background: GROUPS[g].soft }}
                >
                  <FoodIcon food={GROUP_ICON[g]} size="3.4cqw" />
                  <span
                    className={`absolute -bottom-[0.3cqw] -right-[0.3cqw] flex h-[2cqw] w-[2cqw] items-center justify-center rounded-full text-[1.2cqw] font-bold text-white ${has ? 'bg-leaf' : 'bg-[#c2412d]'}`}
                  >
                    {has ? '✓' : '✕'}
                  </span>
                </div>
                <span className="font-spartan text-[1.2cqw] font-semibold" style={{ color: GROUPS[g].color }}>
                  {GROUPS[g].label}
                </span>
              </div>
            )
          })}
        </div>

        <ul className="mt-[1.2cqw] space-y-[0.5cqw] font-spartan text-[1.45cqw] leading-snug text-ink/80">
          {result.tips.slice(0, 2).map((t) => (
            <li key={t} className="flex gap-[0.6cqw]">
              <span className="emoji">💡</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-[7%] left-1/2 flex -translate-x-1/2 items-center gap-[2cqw]">
        <button
          onClick={onPlayAgain}
          className="rounded-full border-[0.25cqw] border-sage px-[3cqw] py-[1cqw] font-poppins text-[1.8cqw] font-semibold text-sage transition hover:bg-sage/10"
        >
          Play again
        </button>
        <button
          onClick={onContinue}
          className="w-[22cqw] rounded-full bg-sage py-[1.2cqw] font-poppins text-[2cqw] font-semibold text-white shadow transition hover:brightness-105 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

function useCountUp(target) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1100)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return n
}

const CONFETTI_COLORS = ['#f6c33b', '#e0262b', '#3e8e41', '#4a64c8', '#d9846a', '#85b2ba']
function Confetti({ show }) {
  if (!show) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-[-5%] block h-[1.2cqw] w-[0.7cqw] rounded-sm"
          style={{
            left: `${(i * 97) % 100}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animation: `confetti ${2.2 + (i % 5) * 0.35}s ${(i % 10) * 0.12}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`@keyframes confetti{to{transform:translateY(70cqw) rotate(${720}deg);opacity:.2}}`}</style>
    </div>
  )
}
