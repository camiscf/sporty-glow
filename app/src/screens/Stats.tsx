import { useMemo } from 'react'
import { Icon } from '../components/Icon'
import { LineChart } from '../components/LineChart'
import type { AppState } from '../types'
import { addDays, dayNumber, formatBRShort } from '../utils'

type Props = {
  state: AppState
  today: string
}

export const Stats = ({ state, today }: Props) => {
  const day = Math.min(state.totalDays, dayNumber(state.startDate, today))

  const allDates = useMemo(() => {
    const arr: string[] = []
    for (let i = 0; i < day; i++) arr.push(addDays(state.startDate, i))
    return arr
  }, [state.startDate, day])

  const perfectDays = allDates.filter((d) => {
    const log = state.logs[d]
    if (!log) return false
    return state.habits.length > 0 && state.habits.every((h) => log.completed[h.id])
  }).length

  const currentStreak = useMemo(() => {
    let streak = 0
    for (let i = allDates.length - 1; i >= 0; i--) {
      const d = allDates[i]
      const log = state.logs[d]
      if (
        log &&
        state.habits.length > 0 &&
        state.habits.every((h) => log.completed[h.id])
      ) {
        streak++
      } else {
        break
      }
    }
    return streak
  }, [allDates, state.logs, state.habits])

  const perHabit = state.habits.map((h) => {
    const done = allDates.filter((d) => state.logs[d]?.completed[h.id]).length
    return { habit: h, done, total: state.totalDays }
  })

  const chartPoints = useMemo(
    () =>
      allDates.map((d, i) => {
        const log = state.logs[d]
        const v = log
          ? state.habits.filter((h) => log.completed[h.id]).length
          : 0
        return { day: i + 1, value: v, date: d }
      }),
    [allDates, state.logs, state.habits],
  )

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-sm pt-sm">
        <h2 className="font-serif text-4xl font-bold text-on-surface">
          Estatísticas
        </h2>
        <p className="text-on-surface-variant">
          Sua disciplina, em números.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-sm">
        <Metric
          label="Dia atual"
          value={`${day}/${state.totalDays}`}
          icon="event"
        />
        <Metric
          label="Streak"
          value={`${currentStreak}`}
          suffix="dias"
          icon="local_fire_department"
        />
        <Metric
          label="Dias perfeitos"
          value={`${perfectDays}`}
          icon="star"
        />
        <Metric
          label="Hábitos"
          value={`${state.habits.length}`}
          icon="checklist"
        />
      </section>

      <section className="glass-panel rounded-2xl p-md flex flex-col gap-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-on-surface">
            Hábitos por dia
          </h3>
          <span className="text-xs uppercase tracking-wider text-on-surface-variant">
            0 – {state.habits.length}
          </span>
        </div>
        <LineChart points={chartPoints} yMax={state.habits.length} />
      </section>

      <section className="glass-panel rounded-2xl p-md flex flex-col gap-sm">
        <h3 className="font-serif text-xl font-semibold text-on-surface">
          Por hábito
        </h3>
        <div className="flex flex-col gap-sm">
          {perHabit.map(({ habit, done, total }) => {
            const pct = total === 0 ? 0 : (done / total) * 100
            return (
              <div key={habit.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <Icon name={habit.icon} />
                    </div>
                    <span className="text-sm font-medium text-on-surface">
                      {habit.name}
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    {done}/{total}
                  </span>
                </div>
                <div className="h-2 w-full bg-tertiary-fixed rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-md flex flex-col gap-sm">
        <h3 className="font-serif text-xl font-semibold text-on-surface">
          Histórico
        </h3>
        <div className="grid grid-cols-7 gap-1.5">
          {allDates.map((d) => {
            const log = state.logs[d]
            const completed = log
              ? state.habits.filter((h) => log.completed[h.id]).length
              : 0
            const total = state.habits.length
            const ratio = total === 0 ? 0 : completed / total
            const bg =
              ratio === 1
                ? 'bg-primary text-on-primary'
                : ratio >= 0.5
                ? 'bg-primary/40 text-on-surface'
                : ratio > 0
                ? 'bg-primary/15 text-on-surface'
                : 'bg-surface-container-low text-on-surface-variant'
            const isToday = d === today
            return (
              <div
                key={d}
                title={`${d}: ${completed}/${total}`}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] ${bg} ${
                  isToday ? 'ring-2 ring-primary' : ''
                }`}
              >
                <span className="opacity-70">{formatBRShort(d)}</span>
                <span className="font-bold">
                  {completed}/{total}
                </span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

const Metric = ({
  label,
  value,
  suffix,
  icon,
}: {
  label: string
  value: string
  suffix?: string
  icon: string
}) => (
  <div className="glass-panel rounded-2xl p-md flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-wider text-on-surface-variant">
        {label}
      </span>
      <Icon name={icon} className="text-primary" filled />
    </div>
    <div className="font-serif text-3xl font-bold text-on-surface">
      {value}
      {suffix && (
        <span className="text-sm font-normal text-on-surface-variant ml-1">
          {suffix}
        </span>
      )}
    </div>
  </div>
)
