import { ProgressRing } from '../components/ProgressRing'
import { Icon } from '../components/Icon'
import type { AppState } from '../types'
import { dayNumber, quoteOfDay } from '../utils'

type Props = {
  state: AppState
  today: string
  toggle: (habitId: string) => void
}

export const Home = ({ state, today, toggle }: Props) => {
  const day = Math.min(state.totalDays, dayNumber(state.startDate, today))
  const totalProgress = day / state.totalDays
  const todayLog = state.logs[today]?.completed ?? {}
  const completedToday = state.habits.filter((h) => todayLog[h.id]).length
  const quote = quoteOfDay(today)

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-sm pt-sm">
        <p className="font-serif text-2xl italic text-on-surface-variant leading-snug">
          "{quote}"
        </p>
      </header>

      <div className="flex justify-center">
        <ProgressRing progress={totalProgress}>
          <span className="text-xs uppercase tracking-widest text-on-surface-variant">
            Dia
          </span>
          <span className="font-serif text-5xl font-bold text-primary leading-none mt-1">
            {day}
          </span>
          <span className="text-sm text-on-surface-variant mt-2">
            de {state.totalDays}
          </span>
          <span className="text-xs text-on-surface-variant mt-1">
            {Math.round(totalProgress * 100)}% completo
          </span>
        </ProgressRing>
      </div>

      <section className="glass-panel rounded-2xl p-md">
        <div className="flex items-center justify-between mb-sm">
          <div>
            <h3 className="font-serif text-xl font-semibold text-on-surface">
              Hoje
            </h3>
            <p className="text-sm text-on-surface-variant">
              {completedToday} de {state.habits.length} hábitos
            </p>
          </div>
          <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-glow-primary">
            <Icon name="local_fire_department" filled />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-sm">
          {state.habits.map((h) => {
            const done = !!todayLog[h.id]
            return (
              <button
                key={h.id}
                onClick={() => toggle(h.id)}
                className={`rounded-xl p-sm flex flex-col gap-1 text-left transition-colors active:scale-[0.98] ${
                  done
                    ? 'bg-primary-fixed/40 border border-primary-fixed'
                    : 'bg-surface-container-low border border-outline-variant/40'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    done
                      ? 'bg-primary text-on-primary'
                      : 'bg-white text-on-surface-variant'
                  }`}
                >
                  <Icon name={h.icon} filled={done} />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant mt-1">
                  {h.name}
                </span>
                <span className="font-semibold text-on-surface text-sm leading-tight">
                  {h.meta}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
