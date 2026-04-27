import { useEffect, useState, useCallback } from 'react'
import type { AppState, DailyLog, Habit } from './types'

const STORAGE_KEY = 'sporty-glow:v1'

const todayISO = (): string => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const uid = (): string =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36)

const defaultState = (): AppState => ({
  startDate: todayISO(),
  totalDays: 75,
  habits: [
    { id: uid(), name: 'Workout 1', meta: 'Outdoor • 45 min', icon: 'directions_run', createdAt: todayISO() },
    { id: uid(), name: 'Workout 2', meta: 'Indoor • 45 min', icon: 'fitness_center', createdAt: todayISO() },
    { id: uid(), name: 'Dieta', meta: 'Sem cheat meals', icon: 'restaurant', createdAt: todayISO() },
    { id: uid(), name: 'Água', meta: '4 litros', icon: 'water_drop', createdAt: todayISO() },
    { id: uid(), name: 'Leitura', meta: '10 páginas', icon: 'menu_book', createdAt: todayISO() },
  ],
  logs: {},
})

const load = (): AppState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as AppState
    if (!parsed.startDate || !Array.isArray(parsed.habits)) return defaultState()
    return { ...parsed, totalDays: parsed.totalDays ?? 75 }
  } catch {
    return defaultState()
  }
}

const save = (state: AppState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const useAppState = () => {
  const [state, setState] = useState<AppState>(() => load())

  useEffect(() => {
    save(state)
  }, [state])

  const setStartDate = useCallback((date: string) => {
    setState((s) => ({ ...s, startDate: date }))
  }, [])

  const setTotalDays = useCallback((n: number) => {
    setState((s) => ({ ...s, totalDays: Math.max(1, Math.floor(n)) }))
  }, [])

  const addHabit = useCallback((habit: Omit<Habit, 'id' | 'createdAt'>) => {
    setState((s) => ({
      ...s,
      habits: [...s.habits, { ...habit, id: uid(), createdAt: todayISO() }],
    }))
  }, [])

  const updateHabit = useCallback((id: string, patch: Partial<Habit>) => {
    setState((s) => ({
      ...s,
      habits: s.habits.map((h) => (h.id === id ? { ...h, ...patch } : h)),
    }))
  }, [])

  const deleteHabit = useCallback((id: string) => {
    setState((s) => {
      const newLogs: Record<string, DailyLog> = {}
      for (const [date, log] of Object.entries(s.logs)) {
        const { [id]: _drop, ...rest } = log.completed
        newLogs[date] = { date, completed: rest }
      }
      return {
        ...s,
        habits: s.habits.filter((h) => h.id !== id),
        logs: newLogs,
      }
    })
  }, [])

  const toggleHabit = useCallback((habitId: string, date: string = todayISO()) => {
    setState((s) => {
      const log = s.logs[date] ?? { date, completed: {} }
      const next: DailyLog = {
        date,
        completed: { ...log.completed, [habitId]: !log.completed[habitId] },
      }
      return { ...s, logs: { ...s.logs, [date]: next } }
    })
  }, [])

  const resetAll = useCallback(() => {
    setState(defaultState())
  }, [])

  return {
    state,
    setStartDate,
    setTotalDays,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    resetAll,
    today: todayISO(),
  }
}

export { todayISO }
