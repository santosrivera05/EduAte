import { useState } from 'react'
import { CORE_GROUPS, FOOD_BY_ID, GROUPS } from '../data/foods'
import FoodIcon from '../components/FoodIcon'
import FoodInfo from '../components/FoodInfo'
import { MenuCard, NewBadge, Stars } from '../components/Icons'
import Modal, { BackButton, CloseButton } from '../components/Modal'
import Plate from '../components/Plate'
import { MenuButton } from '../components/SideMenu'
import { recipeSteps, scoreMeal } from '../lib/game'

const TILTS = [-4, 3.5, 2.5, -3, -2, 4]

export default function MyMenuScreen({ meals, onOpenMeal, onDeleteMeal, onPlay, onOpenMenu }) {
  const [openId, setOpenId] = useState(null)
  const open = meals.find((m) => m.id === openId)

  const openMeal = (m) => {
    setOpenId(m.id)
    onOpenMeal(m.id)
  }

  const cards = meals.length === 0 ? [null, null] : meals.length === 1 ? [meals[0], null] : meals

  return (
    <div className="absolute inset-0 bg-sky">
      <MenuButton onClick={onOpenMenu} />
      <div className="no-scrollbar absolute inset-0 overflow-y-auto">
        <header className="flex items-center justify-center gap-[4cqw] pb-[1cqw] pt-[2.6cqw]">
          <MenuCard className="w-[10cqw] -rotate-3" />
          <h1 className="font-hand text-[7.5cqw] leading-none text-ink-blue">My Menu</h1>
        </header>

        <div className="mx-auto grid w-[74cqw] grid-cols-2 gap-x-[8cqw] gap-y-[3cqw] pb-[6cqw] pt-[1.5cqw]">
          {cards.map((m, i) => (
            <FragmentWithHint key={m ? m.id : `empty-${i}`} showHint={i === 1} empty={!meals.length}>
              <Chalkboard tilt={TILTS[i % TILTS.length]} index={i} onClick={m ? () => openMeal(m) : onPlay}>
                {m ? (
                  <>
                    <div className="absolute left-[5%] right-[30%] top-[5%] text-left">
                      <div className="chalk-text truncate font-hand text-[2.2cqw] leading-tight">{m.name}</div>
                    </div>
                    <Stars count={m.stars} className="absolute right-[4%] top-[5%] gap-[0.2cqw]" starClass="w-[2.2cqw]" />
                    <div className="absolute inset-x-[6%] top-[17%]">
                      <Plate items={m.items} />
                    </div>
                    {m.isNew && <NewBadge className="absolute -bottom-[2cqw] left-[12%] w-[13cqw] animate-pop" />}
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-[0.6cqw]">
                    <span className="chalk-text font-hand text-[7cqw] leading-none opacity-70">?</span>
                    <span className="chalk-text font-hand text-[2.2cqw] opacity-80">
                      {i === 0 ? 'Tap to play and unlock a meal!' : 'Play again for a new meal!'}
                    </span>
                  </div>
                )}
              </Chalkboard>
            </FragmentWithHint>
          ))}
        </div>
      </div>

      {open && (
        <MealDetail
          meal={open}
          onClose={() => setOpenId(null)}
          onDelete={() => {
            onDeleteMeal(open.id)
            setOpenId(null)
          }}
        />
      )}
    </div>
  )
}

/** Inserts the "Click on a meal…" line after the first row, like the mockup. */
function FragmentWithHint({ children, showHint, empty }) {
  return (
    <>
      {children}
      {showHint && (
        <p className="col-span-2 -my-[0.5cqw] text-center font-spartan text-[3cqw] font-light text-white">
          {empty ? (
            <>
              Play a round to add a <b className="font-bold">meal</b> to your menu!
            </>
          ) : (
            <>
              Click on a <b className="font-bold">meal</b> to learn how it’s made!
            </>
          )}
        </p>
      )}
    </>
  )
}

function Chalkboard({ children, tilt, index, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-[4/3] w-full animate-rise transition duration-300 hover:scale-[1.03]"
      style={{ rotate: `${tilt}deg`, animationDelay: `${index * 70}ms` }}
    >
      <div className="absolute inset-0 rounded-[0.6cqw] bg-wood shadow-[0_0.8cqw_1.4cqw_rgba(0,0,0,0.18)]">
        <div className="absolute inset-0 rounded-[0.6cqw] bg-[linear-gradient(170deg,rgba(255,255,255,0.25),transparent_40%,rgba(0,0,0,0.12))]" />
      </div>
      <div
        className="absolute inset-[4.5%] overflow-hidden rounded-[0.3cqw] bg-chalk"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 25% 30%, rgba(255,255,255,0.07), transparent 45%), radial-gradient(ellipse at 75% 70%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(ellipse at 60% 20%, rgba(255,255,255,0.04), transparent 35%)',
        }}
      />
      <div className="absolute inset-[4.5%]">{children}</div>
    </button>
  )
}

function MealDetail({ meal, onClose, onDelete }) {
  const [food, setFood] = useState(null)
  const [confirm, setConfirm] = useState(false)
  const result = scoreMeal(meal.items)
  const steps = recipeSteps(meal.items, meal.mealType)
  const foods = meal.items.map((id) => FOOD_BY_ID[id]).filter(Boolean)

  return (
    <Modal onClose={onClose} label={meal.name} className="flex h-[56cqw] w-[90cqw]">
      <CloseButton onClick={onClose} />
      {food ? (
        <div className="flex w-full flex-col px-[3cqw] py-[2cqw]">
          <BackButton onClick={() => setFood(null)} className="self-start">
            Back to {meal.name}
          </BackButton>
          <div className="mt-[1.6cqw] min-h-0 flex-1">
            <FoodInfo food={food} />
          </div>
        </div>
      ) : (
        <>
          {/* left: the meal */}
          <div className="flex w-[36cqw] shrink-0 flex-col bg-sky px-[2.4cqw] py-[2.4cqw]">
            <div className="relative aspect-[4/3] w-full -rotate-2 rounded-[0.6cqw] bg-wood p-[4.5%] shadow-lg">
              <div className="relative h-full w-full rounded-[0.3cqw] bg-chalk">
                <div className="absolute inset-x-[6%] top-[10%]">
                  <Plate items={meal.items} />
                </div>
              </div>
            </div>
            <h2 className="mt-[2cqw] font-hand text-[3.4cqw] leading-tight text-ink-blue">{meal.name}</h2>
            <div className="mt-[0.4cqw] flex items-center gap-[1cqw] font-spartan text-[1.6cqw] text-ink/70">
              <Stars count={meal.stars} className="gap-[0.2cqw]" starClass="w-[2.4cqw]" />
              <span className="font-bold text-ink">{meal.score}/100</span>
              <span>· {new Date(meal.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mt-[1.2cqw] flex flex-wrap gap-[0.6cqw]">
              {CORE_GROUPS.map((g) => {
                const has = result.covered.includes(g)
                return (
                  <span
                    key={g}
                    className={`rounded-full px-[1cqw] py-[0.25cqw] font-spartan text-[1.25cqw] font-semibold ${has ? 'text-white' : 'bg-white/50 text-ink/40 line-through'}`}
                    style={has ? { background: GROUPS[g].color } : undefined}
                  >
                    {GROUPS[g].label}
                  </span>
                )
              })}
            </div>
            <div className="mt-auto pt-[1cqw]">
              {confirm ? (
                <div className="flex items-center gap-[0.8cqw] font-spartan text-[1.4cqw]">
                  <span>Remove this meal?</span>
                  <button onClick={onDelete} className="rounded-full bg-[#c2412d] px-[1.4cqw] py-[0.4cqw] font-semibold text-white">
                    Remove
                  </button>
                  <button onClick={() => setConfirm(false)} className="rounded-full bg-white/60 px-[1.4cqw] py-[0.4cqw]">
                    Keep
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirm(true)} className="font-spartan text-[1.4cqw] text-ink/50 underline hover:text-ink/80">
                  Remove from My Menu
                </button>
              )}
            </div>
          </div>

          {/* right: ingredients + how it's made */}
          <div className="no-scrollbar min-w-0 flex-1 overflow-y-auto px-[3cqw] py-[2.4cqw]">
            <h3 className="font-hand text-[3.2cqw] leading-none text-ink">What’s in it?</h3>
            <p className="mt-[0.4cqw] font-spartan text-[1.4cqw] text-ink/60">Tap a food to learn about it.</p>
            <div className="mt-[1cqw] flex flex-wrap gap-[1cqw]">
              {foods.map((x, i) => (
                <button
                  key={`${x.id}-${i}`}
                  onClick={() => setFood(x)}
                  className="flex items-center gap-[0.6cqw] rounded-[1.4cqw] bg-tile py-[0.5cqw] pl-[0.6cqw] pr-[1.4cqw] transition hover:-translate-y-[0.2cqw] hover:shadow-md"
                >
                  <FoodIcon food={x} size="3.6cqw" />
                  <span className="font-spartan text-[1.5cqw] font-semibold">{x.name}</span>
                </button>
              ))}
            </div>

            <h3 className="mt-[2.4cqw] font-hand text-[3.2cqw] leading-none text-ink">How it’s made</h3>
            <ol className="mt-[1.2cqw] space-y-[1cqw]">
              {steps.map((s, i) => (
                <li key={i} className="flex items-start gap-[1.2cqw]">
                  <span className="flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full bg-sage font-spartan text-[1.5cqw] font-bold text-white">
                    {i + 1}
                  </span>
                  {s.food && <FoodIcon food={s.food} size="3cqw" />}
                  <div className="pt-[0.3cqw] font-spartan text-[1.65cqw] leading-snug">
                    {s.text}
                    {s.adult && (
                      <span className="ml-[0.8cqw] inline-block rounded-full bg-[#fbefcf] px-[0.9cqw] py-[0.1cqw] text-[1.25cqw] font-semibold text-[#a7700c]">
                        Ask a grown-up
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-[2.4cqw] rounded-[1.6cqw] bg-white/70 px-[1.8cqw] py-[1.2cqw] font-spartan text-[1.5cqw] leading-snug">
              <span className="font-bold">Chef’s tip: </span>
              {result.tips[0]}
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}
