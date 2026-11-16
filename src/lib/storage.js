const MEALS_KEY = 'eduate.meals.v1'
const SETTINGS_KEY = 'eduate.settings.v1'

export const DEFAULT_SETTINGS = { itemsPerMeal: 6, hints: true, intro: true }

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode) – app keeps working in memory */
  }
}

export const loadMeals = () => {
  const meals = read(MEALS_KEY, [])
  return Array.isArray(meals) ? meals : []
}
export const saveMeals = (meals) => write(MEALS_KEY, meals)

export const loadSettings = () => ({ ...DEFAULT_SETTINGS, ...read(SETTINGS_KEY, {}) })
export const saveSettings = (s) => write(SETTINGS_KEY, s)
