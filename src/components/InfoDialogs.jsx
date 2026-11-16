import { useState } from 'react'
import { LEVELS } from '../data/foods'
import Modal, { CloseButton } from './Modal'

function Shell({ title, onClose, children }) {
  return (
    <Modal onClose={onClose} label={title} className="flex w-[64cqw] flex-col bg-cream">
      <CloseButton onClick={onClose} />
      <div className="bg-sidebar px-[3cqw] py-[1.6cqw]">
        <h2 className="font-hand text-[4.2cqw] leading-none text-white drop-shadow">{title}</h2>
      </div>
      <div className="no-scrollbar max-h-[44cqw] overflow-y-auto px-[3cqw] py-[2cqw] text-[1.8cqw] leading-snug">
        {children}
      </div>
    </Modal>
  )
}

export function HelpDialog({ onClose }) {
  const steps = [
    ['🎮', 'Play', 'Walk down the food path. At each stop, pick 1 of 3 foods to add to your meal.'],
    ['🍽️', 'Build a meal', 'After your last pick, see your plate and your balance score. Try to get all 5 food groups!'],
    ['📖', 'Learn', 'Tap a food group, then tap any food to discover what it does for your body.'],
    ['📋', 'My Menu', 'Every meal you make is saved. Tap one to learn how to make it.'],
  ]
  return (
    <Shell title="How to Play" onClose={onClose}>
      <ul className="space-y-[1.4cqw]">
        {steps.map(([icon, t, d]) => (
          <li key={t} className="flex items-start gap-[1.6cqw]">
            <span className="emoji text-[3.6cqw]">{icon}</span>
            <div>
              <div className="font-bold">{t}</div>
              <div className="text-ink/75">{d}</div>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

export function ParentsDialog({ onClose }) {
  return (
    <Shell title="For Parents" onClose={onClose}>
      <p>
        Edu-Ate helps kids practice building balanced meals using the five food groups (vegetables, fruits,
        proteins, carbs and dairy) and a simple “GO / SLOW / WHOA” way of talking about how often to eat a food.
      </p>
      <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1.2cqw]">
        {Object.values(LEVELS).map((l) => (
          <div key={l.id} className="rounded-[1.4cqw] p-[1.2cqw]" style={{ background: l.bg }}>
            <div className="text-[2cqw] font-extrabold" style={{ color: l.color }}>
              {l.short}
            </div>
            <div className="font-semibold">{l.label}</div>
            <div className="text-[1.5cqw] text-ink/70">{l.blurb}</div>
          </div>
        ))}
      </div>
      <h3 className="mt-[2cqw] font-bold">How the score works</h3>
      <ul className="mt-[0.6cqw] list-disc space-y-[0.4cqw] pl-[2.4cqw] text-ink/80">
        <li>Up to 50 points for food-group balance (10 for each group on the plate).</li>
        <li>Up to 35 points for choosing everyday foods over treats.</li>
        <li>Up to 15 points for a healthy drink like water or milk.</li>
      </ul>
      <h3 className="mt-[2cqw] font-bold">Try it together</h3>
      <p className="text-ink/80">
        Open a saved meal in My Menu and cook it together. Steps that need the stove, oven or a sharp knife are
        marked “Ask a grown-up.” No account is needed and meals are saved only on this device.
      </p>
    </Shell>
  )
}

export function SettingsDialog({ settings, onChange, onClearMeals, mealCount, onClose }) {
  const [confirm, setConfirm] = useState(false)
  return (
    <Shell title="Settings" onClose={onClose}>
      <div className="space-y-[2cqw]">
        <div>
          <div className="font-bold">Foods per meal</div>
          <div className="mt-[0.8cqw] flex gap-[1cqw]">
            {[5, 6].map((n) => (
              <button
                key={n}
                onClick={() => onChange({ ...settings, itemsPerMeal: n })}
                className={`rounded-full px-[2.4cqw] py-[0.8cqw] font-semibold transition ${
                  settings.itemsPerMeal === n ? 'bg-sage text-white' : 'bg-black/10 hover:bg-black/15'
                }`}
              >
                {n} foods
              </button>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer items-center justify-between gap-[2cqw]">
          <span>
            <span className="block font-bold">Helper tips</span>
            <span className="text-ink/70">The guide explains each food you pick during the game.</span>
          </span>
          <input
            type="checkbox"
            className="h-[2.6cqw] w-[2.6cqw] accent-[#6e9189]"
            checked={settings.hints}
            onChange={(e) => onChange({ ...settings, hints: e.target.checked })}
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between gap-[2cqw]">
          <span>
            <span className="block font-bold">Show title screen</span>
            <span className="text-ink/70">Show the Edu-Ate splash screen when the app opens.</span>
          </span>
          <input
            type="checkbox"
            className="h-[2.6cqw] w-[2.6cqw] accent-[#6e9189]"
            checked={settings.intro}
            onChange={(e) => onChange({ ...settings, intro: e.target.checked })}
          />
        </label>
        <div>
          <div className="font-bold">My Menu</div>
          <div className="text-ink/70">
            {mealCount} saved {mealCount === 1 ? 'meal' : 'meals'}
          </div>
          {confirm ? (
            <div className="mt-[0.8cqw] flex items-center gap-[1cqw]">
              <span>Remove all saved meals?</span>
              <button
                onClick={() => {
                  onClearMeals()
                  setConfirm(false)
                }}
                className="rounded-full bg-[#c2412d] px-[2cqw] py-[0.6cqw] font-semibold text-white"
              >
                Yes, clear
              </button>
              <button onClick={() => setConfirm(false)} className="rounded-full bg-black/10 px-[2cqw] py-[0.6cqw]">
                Cancel
              </button>
            </div>
          ) : (
            <button
              disabled={!mealCount}
              onClick={() => setConfirm(true)}
              className="mt-[0.8cqw] rounded-full bg-black/10 px-[2cqw] py-[0.6cqw] font-semibold transition hover:bg-black/15 disabled:opacity-40"
            >
              Clear My Menu
            </button>
          )}
        </div>
      </div>
    </Shell>
  )
}
