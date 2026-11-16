import { useEffect, useMemo, useRef, useState } from 'react'
import FoodIcon from '../components/FoodIcon'
import { Controller, GuideKid, SpeechBubble } from '../components/Icons'
import { MenuButton } from '../components/SideMenu'
import { FOOD_BY_ID } from '../data/foods'
import { createRound, feedbackFor, matchesTarget, targetColor, targetWord } from '../lib/game'

// Where a row sits on the path based on how far ahead of the player it is.
// offset 0 = the row you are choosing from (closest to you).
const ROW_POS = {
  '-1': { top: 118, scale: 1.25, opacity: 0 },
  0: { top: 66, scale: 1, opacity: 1 },
  1: { top: 30, scale: 0.7, opacity: 1 },
  2: { top: 4, scale: 0.55, opacity: 1 },
  3: { top: -14, scale: 0.42, opacity: 0 },
}
const posFor = (offset) => ROW_POS[Math.max(-1, Math.min(3, offset))]

export default function GameScreen({ settings, onFinish, onHome, onOpenMenu }) {
  const round = useMemo(() => createRound(settings.itemsPerMeal), [settings.itemsPerMeal])
  const [step, setStep] = useState(0)
  const [picks, setPicks] = useState([]) // food ids
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const current = round.steps[step]
  const meal = round.mealType.toLowerCase()
  const done = step >= round.steps.length

  const choose = (food) => {
    if (selected || done) return
    setSelected(food.id)
    const nextPicks = [...picks, food.id]
    setPicks(nextPicks)
    setFeedback(settings.hints ? feedbackFor(food, current.target) : { mood: 'happy', text: 'Great pick!' })

    timer.current = setTimeout(
      () => {
        setSelected(null)
        setFeedback(null)
        if (step + 1 >= round.steps.length) {
          setStep(step + 1)
          timer.current = setTimeout(() => onFinish(nextPicks, round.mealType), 450)
        } else {
          setStep(step + 1)
        }
      },
      settings.hints ? 1700 : 800,
    )
  }

  const bubbleText = feedback
    ? feedback.text
    : current
      ? current.target === 'drink'
        ? `What should I drink with my ${meal}?`
        : `Help me pick a ${targetWord(current.target)} for my ${meal}!`
      : 'Yum! Let’s eat!'

  return (
    <div className="absolute inset-0 overflow-clip bg-sun">
      {/* the path */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="15.5,100 30.5,0 69.5,0 85,100" fill="#85b2ba" />
        <polygon points="17.5,100 32,0 68,0 83,100" fill="#fbf3e6" />
      </svg>
      <PathDashes step={step} />

      {/* rows of food choices */}
      {round.steps.map((s, i) => {
        const offset = i - step
        const p = posFor(offset)
        return (
          <div
            key={i}
            className="absolute left-1/2 flex w-[58cqw] items-center justify-between transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              top: `${p.top}%`,
              opacity: p.opacity,
              transform: `translate(-50%, -50%) scale(${p.scale})`,
              zIndex: 10 - Math.abs(offset),
              pointerEvents: offset === 0 ? 'auto' : 'none',
            }}
            aria-hidden={offset !== 0}
          >
            {s.options.map((food) => {
              const isSel = offset === 0 && selected === food.id
              const good = isSel && matchesTarget(food, s.target) && food.level === 'go'
              return (
                <button
                  key={food.id}
                  onClick={() => choose(food)}
                  disabled={offset !== 0 || !!selected}
                  aria-label={food.name}
                  className={`relative flex h-[16cqw] w-[16cqw] items-center justify-center rounded-[3cqw] bg-tile transition duration-200 ${
                    offset === 0 && !selected ? 'hover:-translate-y-[0.6cqw] hover:shadow-xl active:scale-95' : ''
                  } ${isSel ? (good ? 'scale-105 ring-[0.7cqw] ring-leaf' : 'scale-105 ring-[0.7cqw] ring-[#d98a1c]') : ''} ${
                    offset === 0 && selected && !isSel ? 'opacity-50' : ''
                  }`}
                >
                  <FoodIcon food={food} size="11.5cqw" className={isSel ? 'animate-wiggle' : ''} />
                  {offset === 0 && (
                    <span
                      className={`absolute -bottom-[2.4cqw] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-[1cqw] py-[0.15cqw] font-spartan text-[1.4cqw] font-semibold text-ink/80 transition-opacity ${
                        selected && !isSel ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      {food.name}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )
      })}

      {/* question */}
      {current && (
        <p
          key={step}
          className="absolute bottom-[3.5%] left-[50%] z-20 -translate-x-1/2 animate-fade whitespace-nowrap font-hand text-[4.2cqw] leading-none"
        >
          {current.target === 'drink' ? (
            <>
              Which <span style={{ color: targetColor('drink') }}>drink</span> is best for you?
            </>
          ) : (
            <>
              Which of these foods is a{' '}
              <span style={{ color: targetColor(current.target) }}>{targetWord(current.target)}</span>?
            </>
          )}
        </p>
      )}

      {/* top-left: home + meal tray */}
      <button onClick={onHome} aria-label="Home" className="absolute left-[2cqw] top-[2.2cqw] z-30 transition hover:scale-105">
        <Controller className="w-[6cqw]" accent="#ecc263" />
      </button>
      <MealTray picks={picks} total={round.steps.length} mealType={round.mealType} />

      <MenuButton onClick={onOpenMenu} />

      {/* guide character */}
      <SpeechBubble className="absolute right-[9%] top-[10%] z-20 h-[17cqw] w-[20cqw]">
        <p key={bubbleText} className="animate-fade font-spartan text-[1.85cqw] leading-[1.25]">
          {bubbleText}
        </p>
      </SpeechBubble>
      <GuideKid
        mood={done ? 'cheer' : feedback?.mood === 'happy' ? 'cheer' : feedback?.mood === 'think' ? 'think' : 'happy'}
        className="absolute bottom-[2%] right-[1.5%] z-20 h-[35cqw]"
      />
    </div>
  )
}

function MealTray({ picks, total, mealType }) {
  return (
    <div className="absolute left-[2cqw] top-[12cqw] z-30 w-[11cqw]">
      <div className="mb-[0.6cqw] whitespace-nowrap font-hand text-[2.4cqw] leading-none text-white drop-shadow-[0_0.15cqw_0_rgba(0,0,0,0.15)]">
        My {mealType}
      </div>
      <div className="grid grid-cols-2 gap-[0.8cqw]">
        {Array.from({ length: total }).map((_, i) => {
          const id = picks[i]
          return (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-[1.4cqw] ${
                id ? 'bg-white/80' : 'border-[0.25cqw] border-dashed border-white/80 bg-white/20'
              }`}
            >
              {id && <TrayFood id={id} />}
            </div>
          )
        })}
      </div>
      <div className="mt-[0.8cqw] font-spartan text-[1.5cqw] font-semibold text-white">
        {Math.min(picks.length, total)} / {total} picked
      </div>
    </div>
  )
}

function TrayFood({ id }) {
  return <FoodIcon food={FOOD_BY_ID[id]} size="4cqw" className="animate-pop" />
}

/** Little dashes down the middle of the path that slide toward you as you travel. */
function PathDashes({ step }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ perspective: '30cqw', perspectiveOrigin: '50% 0%' }}
      aria-hidden="true"
    >
      <div
        className="absolute bottom-0 left-1/2 h-[220%] w-[3cqw] -translate-x-1/2 transition-[background-position] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          transformOrigin: '50% 100%',
          transform: 'rotateX(62deg)',
          backgroundImage: 'linear-gradient(to bottom, rgba(133,178,186,0.35) 0 45%, transparent 45% 100%)',
          backgroundSize: '100% 9cqw',
          backgroundPosition: `0 ${step * 27}cqw`,
          maskImage: 'linear-gradient(to bottom, transparent, black 35%)',
        }}
      />
    </div>
  )
}
