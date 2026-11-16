import { GROUPS, LEVELS } from '../data/foods'
import FoodIcon from './FoodIcon'

/** Detailed "learn more" card for one food. */
export default function FoodInfo({ food }) {
  const level = LEVELS[food.level]
  const home = GROUPS[food.category]
  return (
    <div className="flex h-full gap-[3cqw]">
      <div className="flex w-[24cqw] shrink-0 flex-col items-center gap-[1.5cqw]">
        <div
          className="flex aspect-square w-full items-center justify-center rounded-[3cqw]"
          style={{ background: home.soft }}
        >
          <FoodIcon food={food} size="16cqw" className="animate-pop" />
        </div>
        <div
          className="w-full rounded-[1.6cqw] px-[1.4cqw] py-[1cqw] text-center"
          style={{ background: level.bg, color: level.color }}
        >
          <div className="text-[2.2cqw] font-extrabold tracking-wide">{level.short}</div>
          <div className="text-[1.5cqw] font-semibold">{level.label}</div>
          <div className="mt-[0.4cqw] text-[1.3cqw] leading-tight text-ink/70">{level.blurb}</div>
        </div>
      </div>

      <div className="no-scrollbar min-w-0 flex-1 overflow-y-auto pr-[1cqw]">
        <h2 className="font-hand text-[5cqw] leading-none" style={{ color: home.color }}>
          {food.name}
        </h2>
        {food.groups.length > 0 && (
          <div className="mt-[1cqw] flex flex-wrap gap-[0.8cqw]">
            {food.groups.map((g) => (
              <span
                key={g}
                className="rounded-full px-[1.2cqw] py-[0.3cqw] text-[1.4cqw] font-semibold text-white"
                style={{ background: GROUPS[g].color }}
              >
                {GROUPS[g].label}
              </span>
            ))}
          </div>
        )}
        <p className="mt-[1.4cqw] text-[1.9cqw] leading-snug">{food.about}</p>

        <h3 className="mt-[1.8cqw] font-hand text-[2.6cqw] text-ink/80">Why it’s good for you</h3>
        <p className="text-[1.8cqw] leading-snug">{food.benefit}</p>

        <div className="mt-[1.2cqw] flex flex-wrap gap-[0.8cqw]">
          {food.nutrients.map((n) => (
            <span
              key={n}
              className="rounded-[1cqw] border-[0.2cqw] border-dashed px-[1cqw] py-[0.3cqw] text-[1.4cqw] font-semibold"
              style={{ borderColor: home.color, color: home.color }}
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-[2cqw] rounded-[1.6cqw] bg-[#fff3c4] px-[1.8cqw] py-[1.2cqw]">
          <div className="font-hand text-[2.3cqw] text-[#a7700c]">⭐ Fun fact!</div>
          <p className="text-[1.7cqw] leading-snug">{food.fact}</p>
        </div>
      </div>
    </div>
  )
}
