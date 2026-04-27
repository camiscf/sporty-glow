import { useState } from 'react'
import { Icon } from './components/Icon'
import { Home } from './screens/Home'
import { Habits } from './screens/Habits'
import { Stats } from './screens/Stats'
import { Settings } from './screens/Settings'
import { useAppState } from './storage'
import { dayNumber } from './utils'

type Tab = 'home' | 'habits' | 'stats'

const App = () => {
  const {
    state,
    today,
    setStartDate,
    setTotalDays,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    resetAll,
  } = useAppState()
  const [tab, setTab] = useState<Tab>('home')
  const [settingsOpen, setSettingsOpen] = useState(false)

  const day = Math.min(state.totalDays, dayNumber(state.startDate, today))

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="ambient-blob-1" />
      <div className="ambient-blob-2" />

      <header className="bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-[0_4px_20px_rgba(30,27,36,0.05)] sticky top-0 z-40 w-full px-container-margin py-3 flex justify-between items-center">
        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-container font-bold">
          <Icon name="auto_awesome" filled />
        </div>
        <h1 className="font-serif text-lg font-bold text-primary">Day {day}</h1>
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary-fixed/40 active:scale-95 transition"
          aria-label="Configurações"
        >
          <Icon name="settings" />
        </button>
      </header>

      <main className="px-container-margin pt-md pb-[120px] max-w-2xl mx-auto relative z-10">
        {tab === 'home' && (
          <Home state={state} today={today} toggle={toggleHabit} />
        )}
        {tab === 'habits' && (
          <Habits
            state={state}
            today={today}
            toggle={toggleHabit}
            addHabit={addHabit}
            updateHabit={updateHabit}
            deleteHabit={deleteHabit}
          />
        )}
        {tab === 'stats' && <Stats state={state} today={today} />}
      </main>

      <nav className="bg-white/70 backdrop-blur-2xl border-t border-white/20 shadow-[0_-8px_30px_rgba(30,27,36,0.08)] fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 pt-3 pb-[max(env(safe-area-inset-bottom),24px)] w-full rounded-t-[32px]">
          <NavButton
            active={tab === 'home'}
            onClick={() => setTab('home')}
            icon="home"
            label="Home"
          />
          <NavButton
            active={tab === 'habits'}
            onClick={() => setTab('habits')}
            icon="checklist"
            label="Hábitos"
          />
          <NavButton
            active={tab === 'stats'}
            onClick={() => setTab('stats')}
            icon="leaderboard"
            label="Stats"
          />
      </nav>

      {settingsOpen && (
        <Settings
          state={state}
          setStartDate={setStartDate}
          setTotalDays={setTotalDays}
          resetAll={resetAll}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )
}

const NavButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: string
  label: string
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition active:scale-90 ${
      active
        ? 'bg-primary-fixed/50 text-primary'
        : 'text-on-surface-variant hover:text-primary'
    }`}
  >
    <Icon name={icon} filled={active} className="mb-1" />
    <span className="font-serif text-[10px] font-semibold uppercase tracking-wider">
      {label}
    </span>
  </button>
)

export default App
