import { FOOD_BY_ID } from '../data/foods'
import FoodIcon from './FoodIcon'

// Spots on the plate (center x/y in %, size in plate-relative cqw).
const PLATE_SPOTS = [
  { x: 54, y: 60, s: 22 },
  { x: 74, y: 58, s: 18 },
  { x: 40, y: 67, s: 16 },
  { x: 67, y: 74, s: 16 },
  { x: 84, y: 71, s: 14 },
  { x: 51, y: 79, s: 14 },
]
const BOWL_SPOTS = [
  { x: 17, y: 66, s: 15 },
  { x: 27, y: 64, s: 14 },
  { x: 22, y: 58, s: 13 },
]
const GLASS_SPOTS = [
  { x: 17, y: 34, s: 25 },
  { x: 30, y: 30, s: 20 },
]

const PLATE_ORDER = ['proteins', 'carbs', 'extras', 'vegetables', 'dairy', 'fruits']

/** Lays the chosen foods out on a plate, like the Lesson Complete art. */
export default function Plate({ items, animate = false, className = '' }) {
  const foods = items.map((id) => FOOD_BY_ID[id]).filter(Boolean)
  const drinks = foods.filter((x) => x.drink)
  const fruits = foods.filter((x) => !x.drink && x.category === 'fruits')
  const rest = foods
    .filter((x) => !x.drink && x.category !== 'fruits')
    .sort((a, b) => PLATE_ORDER.indexOf(a.category) - PLATE_ORDER.indexOf(b.category))

  const bowlFruits = fruits.slice(0, BOWL_SPOTS.length)
  const plateFoods = [...rest, ...fruits.slice(BOWL_SPOTS.length)]

  const placed = [
    ...drinks.slice(0, 2).map((food, i) => ({ food, ...GLASS_SPOTS[i], z: 1 })),
    ...plateFoods.slice(0, PLATE_SPOTS.length).map((food, i) => ({ food, ...PLATE_SPOTS[i], z: 3 })),
    ...bowlFruits.map((food, i) => ({ food, ...BOWL_SPOTS[i], z: 6 })),
  ]

  return (
    <div className={`relative aspect-[100/64] w-full [container-type:inline-size] ${className}`}>
      {/* plate */}
      <svg viewBox="0 0 100 64" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <ellipse cx="60" cy="58" rx="38" ry="5" fill="#000" opacity="0.07" />
        <ellipse cx="60" cy="52" rx="40" ry="11.5" fill="#dfb3ae" />
        <ellipse cx="60" cy="50.5" rx="40" ry="11.5" fill="#f4dad6" />
        <ellipse cx="60" cy="50" rx="30" ry="7.5" fill="#e2b9b4" />
        <path d="M88 46 Q96 49 92 54" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8" />
      </svg>

      {placed
        .filter((p) => p.z < 6)
        .sort((a, b) => a.y - b.y)
        .map((p, i) => (
          <Spot key={`${p.food.id}-${i}`} {...p} delay={i} animate={animate} />
        ))}

      {/* fruit bowl */}
      {bowlFruits.length > 0 && (
        <>
          <svg
            viewBox="0 0 40 20"
            className="absolute left-[4%] top-[63%] z-[5] w-[34%]"
            aria-hidden="true"
          >
            <path d="M1 4 Q3 19 20 19 Q37 19 39 4 Z" fill="#b07c55" />
            <ellipse cx="20" cy="4" rx="19" ry="3.6" fill="#c69168" />
            <ellipse cx="20" cy="4.4" rx="16" ry="2.4" fill="#9a6a45" />
          </svg>
          {placed
            .filter((p) => p.z === 6)
            .map((p, i) => (
              <Spot key={`bowl-${p.food.id}-${i}`} {...p} delay={i + 4} animate={animate} />
            ))}
        </>
      )}
    </div>
  )
}

function Spot({ food, x, y, s, z, delay, animate }) {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${animate ? 'animate-pop' : ''}`}
      style={{ left: `${x}%`, top: `${y}%`, zIndex: z, animationDelay: animate ? `${delay * 120 + 200}ms` : undefined }}
    >
      <FoodIcon food={food} size={`${s}cqw`} />
    </div>
  )
}
