// Renders a food as either an emoji or a custom illustration.

function MilkCarton() {
  return (
    <svg viewBox="0 0 64 100" className="h-full w-full">
      <path d="M10 32 L20 12 H44 L54 32 Z" fill="#9fbfca" />
      <rect x="20" y="4" width="24" height="9" fill="#c4dbe3" />
      <ellipse cx="38" cy="8" rx="6" ry="4" fill="#fff" stroke="#c5cfd3" />
      <rect x="10" y="32" width="44" height="64" rx="2" fill="#bcd6df" />
      <rect x="10" y="32" width="10" height="64" fill="#a7c6d1" />
      <rect x="22" y="40" width="30" height="16" rx="3" fill="#7fa8b5" />
      <text x="37" y="72" textAnchor="middle" fontFamily="League Spartan, sans-serif" fontWeight="700" fontSize="13" fill="#fff">
        Milk
      </text>
      <path
        d="M24 80 q3 -3 6 0 t6 0 t6 0 t6 0 M24 86 q3 -3 6 0 t6 0 t6 0 t6 0"
        stroke="#fff"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  )
}

function YogurtCup() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path d="M10 22 L16 58 Q32 62 48 58 L54 22 Z" fill="#fbfbfd" stroke="#c8ccd8" strokeWidth="1.5" />
      <path d="M12 30 L52 30 L50 40 L14 40 Z" fill="#2c5fb0" opacity="0.9" />
      <ellipse cx="32" cy="20" rx="24" ry="9" fill="#2457a6" />
      <ellipse cx="32" cy="18" rx="22" ry="7" fill="#2e66bd" />
      <text x="32" y="21.5" textAnchor="middle" fontFamily="League Spartan, sans-serif" fontWeight="800" fontSize="8.5" fill="#fff">
        YOGURT
      </text>
    </svg>
  )
}

function ChipsBag() {
  return (
    <svg viewBox="0 0 64 84" className="h-full w-full">
      <path
        d="M8 6 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 L54 78 l-4 -4 l-4 4 l-4 -4 l-4 4 l-4 -4 l-4 4 l-4 -4 l-4 4 l-4 -4 l-4 4 l-4 -4 l-4 4 Z"
        fill="#f4c94f"
        stroke="#e8573f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="9" y="64" width="46" height="9" fill="#3c86b5" />
      <rect x="9" y="60" width="46" height="4" fill="#e8573f" />
      <text x="32" y="22" textAnchor="middle" fontFamily="League Spartan, sans-serif" fontWeight="800" fontSize="11" fill="#2d6fa3">
        CHIPS
      </text>
      <ellipse cx="26" cy="38" rx="10" ry="7" fill="#fbe7a1" stroke="#d9a637" transform="rotate(-20 26 38)" />
      <ellipse cx="40" cy="46" rx="10" ry="7" fill="#fbe7a1" stroke="#d9a637" transform="rotate(15 40 46)" />
      <circle cx="24" cy="36" r="2" fill="#e8573f" />
      <circle cx="42" cy="47" r="2" fill="#e8573f" />
    </svg>
  )
}

function WaterGlass() {
  return (
    <svg viewBox="0 0 56 76" className="h-full w-full">
      <path d="M8 6 L14 70 Q28 74 42 70 L48 6 Z" fill="#eef7fc" stroke="#9cc3d6" strokeWidth="2.5" />
      <path d="M11 26 L15.5 68 Q28 71 40.5 68 L45 26 Q28 30 11 26 Z" fill="#bfe1f3" />
      <ellipse cx="28" cy="27" rx="17" ry="3" fill="#d8eef9" />
      <path d="M16 34 L19 62" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="28" cy="6" rx="20" ry="3" fill="none" stroke="#9cc3d6" strokeWidth="2" />
    </svg>
  )
}

const ICONS = { milk: MilkCarton, yogurt: YogurtCup, chips: ChipsBag, water: WaterGlass }

export default function FoodIcon({ food, size = '8cqw', className = '', style }) {
  const Icon = food.icon && ICONS[food.icon]
  return (
    <span
      className={`food-shadow inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size, ...style }}
      role="img"
      aria-label={food.name}
    >
      {Icon ? (
        <span className="block h-[92%] w-[92%]">
          <Icon />
        </span>
      ) : (
        <span className="emoji" style={{ fontSize: `calc(${size} * 0.82)` }}>
          {food.emoji}
        </span>
      )}
    </span>
  )
}
