export type HabitIcon =
  | 'directions_run'
  | 'fitness_center'
  | 'restaurant'
  | 'water_drop'
  | 'menu_book'
  | 'self_improvement'
  | 'bedtime'
  | 'spa'
  | 'favorite'
  | 'sports_gymnastics'

export type Habit = {
  id: string
  name: string
  meta: string
  icon: HabitIcon
  createdAt: string
}

export type DailyLog = {
  date: string
  completed: Record<string, boolean>
}

export type AppState = {
  startDate: string
  habits: Habit[]
  logs: Record<string, DailyLog>
  totalDays: number
}

export const ICON_OPTIONS: { icon: HabitIcon; label: string }[] = [
  { icon: 'directions_run', label: 'Corrida' },
  { icon: 'fitness_center', label: 'Musculação' },
  { icon: 'sports_gymnastics', label: 'Treino' },
  { icon: 'restaurant', label: 'Dieta' },
  { icon: 'water_drop', label: 'Água' },
  { icon: 'menu_book', label: 'Leitura' },
  { icon: 'self_improvement', label: 'Meditação' },
  { icon: 'bedtime', label: 'Sono' },
  { icon: 'spa', label: 'Skincare' },
  { icon: 'favorite', label: 'Bem-estar' },
]
