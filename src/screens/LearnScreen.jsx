import { useState } from 'react'
import { FOOD_BY_ID, GROUPS, LEVELS, foodsInCategory } from '../data/foods'
import FoodIcon from '../components/FoodIcon'
import FoodInfo from '../components/FoodInfo'
import { Book } from '../components/Icons'
import Modal, { BackButton, CloseButton } from '../components/Modal'

const F = FOOD_BY_ID

// Each cluster: where it sits on the page and which foods make up the picture.
const CLUSTERS = [
  {
    id: 'vegetables',
    x: 21, y: 27,
    art: [{ food: F.broccoli, size: 22, x: 0, y: 0 }],
    label: { x: 0, y: -4, size: 4.6, cls: 'label-outline' },
  },
  {
    id: 'fruits',
    x: 77, y: 27,
    art: [{ food: F.apple, size: 22, x: 0, y: 0 }],
    label: { x: 0, y: 1, size: 5.6, cls: 'label-outline' },
  },
  {
    id: 'dairy',
    x: 50, y: 44,
    art: [
      { food: F.milk, size: 19, x: 0, y: 0 },
      { food: { ...F.cheese, emoji: '🧈', name: 'Butter' }, size: 9, x: -8, y: 9, rot: -10 },
      { food: F.yogurt, size: 9, x: 8, y: 10 },
    ],
    label: { x: 0, y: -11.5, size: 3.6, cls: 'text-white drop-shadow-[0_0.2cqw_0.3cqw_rgba(0,0,0,0.25)]' },
  },
  {
    id: 'proteins',
    x: 21, y: 74,
    art: [
      { food: F.chicken, size: 17, x: -4, y: -3, rot: -10 },
      { food: F.egg, size: 8, x: 7, y: 5 },
      { food: F.egg, size: 8, x: 12, y: 3 },
      { food: F.fish, size: 9, x: 4, y: 9, rot: 8 },
    ],
    label: { x: -2, y: -1, size: 4.6, cls: 'label-outline' },
  },
  {
    id: 'carbs',
    x: 78, y: 72,
    art: [
      { food: F.bread, size: 17, x: 3, y: -1, rot: 8 },
      { food: F.rice, size: 12, x: -7, y: 6 },
    ],
    label: { x: 2, y: -3, size: 5, cls: 'text-ink drop-shadow-[0_0.2cqw_0_rgba(255,255,255,0.9)]' },
  },
  {
    id: 'extras',
    x: 50, y: 84,
    art: [
      { food: F.water, size: 8, x: -6, y: 0 },
      { food: F.donut, size: 7, x: 1, y: 2, rot: -12 },
      { food: F.soda, size: 7.5, x: 7, y: -1 },
    ],
    label: { x: 0, y: -6.5, size: 2.4, cls: 'text-[#5b3d7c]' },
  },
]

export default function LearnScreen({ onHome }) {
  const [group, setGroup] = useState(null)

  return (
    <div className="absolute inset-0 flex flex-col bg-mint">
      <header
        className="relative flex h-[6.8cqw] shrink-0 items-center px-[1.2cqw]"
        style={{
          background:
            'linear-gradient(90deg,#3d3a63 0%,#6c3f5b 14%,#a2564c 30%,#c98a63 46%,#d4ac7a 55%,#bfb88f 63%,#8fa19a 74%,#6c7b8f 86%,#615a86 100%)',
        }}
      >
        <button onClick={onHome} className="flex items-center gap-[1.6cqw]" aria-label="Edu-Ate home">
          <span className="font-hand text-[4.4cqw] leading-none text-white">Edu-Ate</span>
          <Book className="w-[5.6cqw]" />
        </button>
      </header>

      <div className="relative flex-1">
        <p className="absolute left-1/2 top-[2.5%] -translate-x-1/2 font-spartan text-[1.6cqw] text-ink/50">
          Tap a food group to explore!
        </p>
        {CLUSTERS.map((c, i) => (
          <Cluster key={c.id} cluster={c} index={i} onClick={() => setGroup(c.id)} />
        ))}
      </div>

      {group && <CategoryPanel groupId={group} onClose={() => setGroup(null)} />}
    </div>
  )
}

function Cluster({ cluster, index, onClick }) {
  const g = GROUPS[cluster.id]
  return (
    <button
      onClick={onClick}
      className="group absolute -translate-x-1/2 -translate-y-1/2 animate-pop"
      style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, animationDelay: `${index * 80}ms` }}
      aria-label={`Learn about ${g.label}`}
    >
      <span className="relative block transition duration-300 group-hover:scale-110 group-active:scale-95">
        {cluster.art.map((a, i) => (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `calc(50% + ${a.x}cqw)`, top: `calc(50% + ${a.y}cqw)`, rotate: a.rot ? `${a.rot}deg` : undefined }}
          >
            <FoodIcon food={a.food} size={`${a.size}cqw`} />
          </span>
        ))}
        {/* invisible box so the button has a size */}
        <span className="block h-[16cqw] w-[20cqw]" />
        <span
          className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-hand leading-none ${cluster.label.cls}`}
          style={{
            left: `calc(50% + ${cluster.label.x}cqw)`,
            top: `calc(50% + ${cluster.label.y}cqw)`,
            fontSize: `${cluster.label.size}cqw`,
          }}
        >
          {g.label}
        </span>
      </span>
    </button>
  )
}

function CategoryPanel({ groupId, onClose }) {
  const g = GROUPS[groupId]
  const foods = foodsInCategory(groupId)
  const [selected, setSelected] = useState(null)
  const idx = selected ? foods.findIndex((x) => x.id === selected) : -1

  const levels = ['go', 'slow', 'whoa'].filter((l) => foods.some((x) => x.level === l))

  return (
    <Modal onClose={onClose} label={g.label} className="flex h-[54cqw] w-[84cqw] flex-col">
      <CloseButton onClick={onClose} />
      <div className="flex items-center gap-[2cqw] px-[3cqw] pt-[2cqw]" style={{ color: g.color }}>
        {selected ? (
          <BackButton onClick={() => setSelected(null)}>All {g.label}</BackButton>
        ) : (
          <h2 className="font-hand text-[5cqw] leading-none">{g.label}</h2>
        )}
      </div>

      {selected ? (
        <div key={selected} className="flex min-h-0 flex-1 flex-col px-[3cqw] pb-[2cqw] pt-[1.5cqw]">
          <div className="min-h-0 flex-1 animate-fade">
            <FoodInfo food={foods[idx]} />
          </div>
          <div className="mt-[1.4cqw] flex justify-between">
            <NavBtn disabled={idx <= 0} onClick={() => setSelected(foods[idx - 1].id)}>
              ← {idx > 0 ? foods[idx - 1].name : ''}
            </NavBtn>
            <NavBtn disabled={idx >= foods.length - 1} onClick={() => setSelected(foods[idx + 1].id)}>
              {idx < foods.length - 1 ? foods[idx + 1].name : ''} →
            </NavBtn>
          </div>
        </div>
      ) : (
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[3cqw] pb-[2.5cqw]">
          <p className="mt-[0.8cqw] max-w-[66cqw] text-[1.8cqw] leading-snug text-ink/80">{g.intro}</p>
          {levels.map((l) => (
            <section key={l} className="mt-[1.8cqw]">
              {levels.length > 1 && (
                <h3 className="mb-[0.8cqw] text-[1.7cqw] font-bold" style={{ color: LEVELS[l].color }}>
                  {LEVELS[l].short} · {LEVELS[l].label}s
                </h3>
              )}
              <div className="grid grid-cols-6 gap-[1.4cqw]">
                {foods
                  .filter((x) => x.level === l)
                  .map((food, i) => (
                    <button
                      key={food.id}
                      onClick={() => setSelected(food.id)}
                      className="group flex animate-pop flex-col items-center gap-[0.6cqw]"
                      style={{ animationDelay: `${i * 35}ms` }}
                    >
                      <span className="flex aspect-square w-full items-center justify-center rounded-[2cqw] bg-tile transition group-hover:-translate-y-[0.4cqw] group-hover:shadow-lg group-active:scale-95">
                        <FoodIcon food={food} size="7.5cqw" />
                      </span>
                      <span className="text-center text-[1.5cqw] font-semibold leading-tight">{food.name}</span>
                    </button>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Modal>
  )
}

function NavBtn({ children, ...props }) {
  return (
    <button
      {...props}
      className="rounded-full bg-black/5 px-[1.8cqw] py-[0.6cqw] text-[1.5cqw] font-semibold text-ink/70 transition hover:bg-black/10 disabled:invisible"
    >
      {children}
    </button>
  )
}
