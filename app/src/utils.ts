export const parseISO = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const formatISO = (d: Date): string => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const daysBetween = (from: string, to: string): number => {
  const a = parseISO(from)
  const b = parseISO(to)
  const ms = b.getTime() - a.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

export const dayNumber = (startDate: string, today: string): number => {
  return Math.max(1, daysBetween(startDate, today) + 1)
}

export const addDays = (iso: string, n: number): string => {
  const d = parseISO(iso)
  d.setDate(d.getDate() + n)
  return formatISO(d)
}

export const formatBR = (iso: string): string => {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export const formatBRShort = (iso: string): string => {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

export const QUOTES = [
  'Disciplina é o atalho mais curto.',
  'Stronger every day, gorgeous!',
  'Você é mais forte que suas desculpas.',
  'Pequenos hábitos. Grande mudança.',
  'O conforto não te leva a lugar nenhum.',
  'Hoje você decide quem você será amanhã.',
  'Consistência é o novo luxo.',
  'Suor hoje, brilho amanhã.',
  'Comece. O resto vem.',
  'A versão de você que você quer ser está sendo construída agora.',
]

export const quoteOfDay = (iso: string): string => {
  const seed = iso.split('-').reduce((acc, p) => acc + Number(p), 0)
  return QUOTES[seed % QUOTES.length]
}
