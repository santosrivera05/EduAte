import { CORE_GROUPS, FOODS, FOOD_BY_ID, GROUPS, LEVELS, shortName } from '../data/foods'

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner']

/**
 * Build a round: a list of steps, each with a target ("pick a vegetable")
 * and three food options.
 */
export function createRound(itemsPerMeal = 6) {
  const mealType = pick(MEAL_TYPES)
  const foodTargets = itemsPerMeal >= 6 ? [...CORE_GROUPS] : CORE_GROUPS.filter((g) => g !== 'dairy')
  const targets = [...shuffle(foodTargets), 'drink']
  const used = new Set()

  const solid = FOODS.filter((x) => !x.drink)
  const take = (pool) => {
    const options = pool.filter((x) => !used.has(x.id))
    const choice = pick(options.length ? options : pool)
    used.add(choice.id)
    return choice
  }

  const steps = targets.map((target) => {
    let options
    if (target === 'drink') {
      const drinks = FOODS.filter((x) => x.drink)
      const water = FOOD_BY_ID.water
      const others = shuffle(drinks.filter((x) => x.id !== 'water'))
      // Always include at least one not-so-healthy drink to think about.
      const notGreat = others.find((x) => x.level !== 'go')
      const third = others.find((x) => x !== notGreat)
      options = [water, notGreat, third]
    } else {
      const right = take(solid.filter((x) => x.category === target && x.level === 'go'))
      const other = take(
        solid.filter((x) => x.level === 'go' && !x.groups.includes(target) && x.category !== 'extras'),
      )
      const treat = take(solid.filter((x) => x.level !== 'go'))
      options = [right, other, treat]
    }
    return { target, options: shuffle(options) }
  })

  return { mealType, steps }
}

export const targetWord = (target) => (target === 'drink' ? 'drink' : GROUPS[target].singular)
export const targetColor = (target) => (target === 'drink' ? '#2B7A9B' : GROUPS[target].color)

export const matchesTarget = (food, target) =>
  target === 'drink' ? !!food.drink : food.groups.includes(target)

/** What the guide says after a pick. */
export function feedbackFor(food, target) {
  const name = shortName(food)
  const word = targetWord(target)
  const ok = matchesTarget(food, target)
  if (ok && food.level === 'go') {
    return { mood: 'happy', text: `Yum! ${name} is a great ${word}!` }
  }
  if (ok && target === 'drink' && food.level !== 'go') {
    return { mood: 'think', text: `${name} has lots of sugar. Water or milk are the best!` }
  }
  if (food.level === 'whoa') {
    return { mood: 'think', text: `Whoa! ${name} is a treat food. Not for every day!` }
  }
  if (food.level === 'slow') {
    return { mood: 'think', text: `${name} is a sometimes food. Okay once in a while!` }
  }
  const g = food.groups[0] ? GROUPS[food.groups[0]].singular : 'food'
  return { mood: 'think', text: `${name} is healthy, but it's a ${g}, not a ${word}!` }
}

/** Score a finished meal out of 100. */
export function scoreMeal(foodIds) {
  const items = foodIds.map((id) => FOOD_BY_ID[id]).filter(Boolean)
  const covered = CORE_GROUPS.filter((g) => items.some((x) => x.groups.includes(g)))
  const missing = CORE_GROUPS.filter((g) => !covered.includes(g))

  const balance = covered.length * 10 // up to 50
  const avg = items.reduce((s, x) => s + LEVELS[x.level].points, 0) / Math.max(items.length, 1)
  const health = Math.round(avg * 35) // up to 35
  const drink = items.find((x) => x.drink)
  const drinkPts = !drink ? 0 : drink.level === 'go' ? 15 : drink.level === 'slow' ? 7 : 0 // up to 15

  const score = Math.min(100, balance + health + drinkPts)
  const stars = score >= 85 ? 3 : score >= 60 ? 2 : 1

  const tips = []
  missing.forEach((g) => {
    const ex = FOODS.filter((x) => x.category === g && x.level === 'go').slice(0, 2).map(shortName)
    tips.push(`Add ${GROUPS[g].article} ${GROUPS[g].singular} next time, like ${ex.join(' or ').toLowerCase()}!`)
  })
  items
    .filter((x) => x.level === 'whoa' && !x.drink)
    .forEach((x) => tips.push(`${shortName(x)} is a treat. Try a fruit or veggie instead!`))
  if (drink && drink.level !== 'go') tips.push('Water and milk are the best drinks for your body.')
  if (!tips.length) tips.push('Every food group is on your plate. That’s a balanced meal!')

  const headline =
    score >= 85 ? 'Super balanced!' : score >= 60 ? 'Pretty balanced!' : 'Keep practicing!'

  return { score, stars, covered, missing, balance, health, drinkPts, tips: tips.slice(0, 3), headline }
}

export function mealName(foodIds, mealType) {
  const items = foodIds.map((id) => FOOD_BY_ID[id]).filter((x) => x && !x.drink)
  // Prefer a protein as the "main dish", then carbs; a vegetable or fruit as the side.
  const rank = (x) =>
    x.category === 'proteins' ? 0
    : x.groups.includes('proteins') ? 1
    : x.category === 'carbs' ? 2
    : x.groups.includes('carbs') ? 3
    : x.level === 'go' ? 4
    : 5
  const main = [...items].sort((a, b) => rank(a) - rank(b))[0]
  const side =
    items.find((x) => x !== main && x.category === 'vegetables') ||
    items.find((x) => x !== main && x.category === 'fruits') ||
    items.find((x) => x !== main)
  if (!main) return `Mystery ${mealType}`
  return `${shortName(main)}${side ? ` & ${shortName(side)}` : ''} ${mealType}`
}

const COOK_ORDER = ['carbs', 'proteins', 'extras', 'vegetables', 'fruits', 'dairy']

/** Step-by-step "how it's made" instructions for a saved meal. */
export function recipeSteps(foodIds, mealType) {
  const items = foodIds.map((id) => FOOD_BY_ID[id]).filter(Boolean)
  const food = items.filter((x) => !x.drink).sort(
    (a, b) => COOK_ORDER.indexOf(a.category) - COOK_ORDER.indexOf(b.category),
  )
  const drinks = items.filter((x) => x.drink)
  return [
    { text: 'Wash your hands with soap and warm water for 20 seconds.' },
    ...food.map((x) => ({ food: x, text: x.prep, adult: x.adult })),
    { text: 'Arrange everything on your plate so it looks colorful and fun!' },
    ...drinks.map((x) => ({ food: x, text: x.prep })),
    { text: `Sit down, take your time, and enjoy your ${mealType.toLowerCase()}!` },
  ]
}

export function buildMeal(foodIds, mealType) {
  const result = scoreMeal(foodIds)
  return {
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: mealName(foodIds, mealType),
    mealType,
    items: foodIds,
    score: result.score,
    stars: result.stars,
    createdAt: new Date().toISOString(),
    isNew: true,
  }
}
