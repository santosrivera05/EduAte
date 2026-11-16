import { useCallback, useState } from 'react'
import { Hamburger } from './components/Icons'
import { HelpDialog, ParentsDialog, SettingsDialog } from './components/InfoDialogs'
import { Drawer } from './components/SideMenu'
import { buildMeal } from './lib/game'
import { loadMeals, loadSettings, saveMeals, saveSettings } from './lib/storage'
import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import LearnScreen from './screens/LearnScreen'
import LessonCompleteScreen from './screens/LessonCompleteScreen'
import LoadingScreen from './screens/LoadingScreen'
import MyMenuScreen from './screens/MyMenuScreen'

export default function App() {
  const [settings, setSettings] = useState(loadSettings)
  const [screen, setScreen] = useState(() => (settings.intro ? 'loading' : 'home'))
  const [meals, setMeals] = useState(loadMeals)
  const [lastMeal, setLastMeal] = useState(null)
  const [roundKey, setRoundKey] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [info, setInfo] = useState(null)

  const updateMeals = useCallback((fn) => {
    setMeals((prev) => {
      const next = fn(prev)
      saveMeals(next)
      return next
    })
  }, [])

  const navigate = useCallback((id) => {
    if (id === 'play') setRoundKey((k) => k + 1)
    setScreen(id)
  }, [])

  const finishRound = (items, mealType) => {
    const meal = buildMeal(items, mealType)
    updateMeals((prev) => [meal, ...prev])
    setLastMeal(meal)
    setScreen('complete')
  }

  const openDrawer = () => setDrawer(true)
  const doneLoading = useCallback(() => setScreen((s) => (s === 'loading' ? 'home' : s)), [])

  let view
  switch (screen) {
    case 'loading':
      view = <LoadingScreen onDone={doneLoading} />
      break
    case 'learn':
      view = <LearnScreen onHome={() => navigate('home')} />
      break
    case 'play':
      view = (
        <GameScreen
          key={roundKey}
          settings={settings}
          onFinish={finishRound}
          onHome={() => navigate('home')}
          onOpenMenu={openDrawer}
        />
      )
      break
    case 'complete':
      view = lastMeal ? (
        <LessonCompleteScreen
          meal={lastMeal}
          onContinue={() => navigate('menu')}
          onPlayAgain={() => navigate('play')}
          onOpenMenu={openDrawer}
        />
      ) : null
      break
    case 'menu':
      view = (
        <MyMenuScreen
          meals={meals}
          onPlay={() => navigate('play')}
          onOpenMenu={openDrawer}
          onOpenMeal={(id) => updateMeals((prev) => prev.map((m) => (m.id === id ? { ...m, isNew: false } : m)))}
          onDeleteMeal={(id) => updateMeals((prev) => prev.filter((m) => m.id !== id))}
        />
      )
      break
    default:
      view = (
        <HomeScreen onNavigate={navigate} onInfo={setInfo} newMeals={meals.filter((m) => m.isNew).length} />
      )
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#f4f2f8,#dcd8e6)]">
      <div className="device">
        <div className="device-camera" />
        <div className="device-button" />
        <div className="device-screen">
          {/* Learn page has its hamburger in the gradient header */}
          {view}
          {screen === 'learn' && (
            <button
              onClick={openDrawer}
              aria-label="Open menu"
              className="absolute right-[1.6cqw] top-[1.3cqw] z-30 transition hover:scale-105"
            >
              <Hamburger className="w-[4.4cqw]" />
            </button>
          )}

          {screen !== 'home' && screen !== 'loading' && (
            <Drawer open={drawer} onClose={() => setDrawer(false)} onNavigate={navigate} onInfo={setInfo} />
          )}

          {info === 'help' && <HelpDialog onClose={() => setInfo(null)} />}
          {info === 'parents' && <ParentsDialog onClose={() => setInfo(null)} />}
          {info === 'settings' && (
            <SettingsDialog
              settings={settings}
              mealCount={meals.length}
              onClearMeals={() => updateMeals(() => [])}
              onChange={(s) => {
                setSettings(s)
                saveSettings(s)
              }}
              onClose={() => setInfo(null)}
            />
          )}
        </div>
      </div>

      <div className="rotate-hint fixed inset-0 z-[100] flex-col items-center justify-center gap-4 bg-home p-8 text-center text-white">
        <span className="emoji text-6xl">📱↻</span>
        <p className="font-hand text-3xl">Turn your device sideways to play Edu-Ate!</p>
      </div>
    </div>
  )
}
