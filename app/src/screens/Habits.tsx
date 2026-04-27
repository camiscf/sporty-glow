import { useState } from 'react'
import { Icon } from '../components/Icon'
import { useBodyClass } from '../hooks/useBodyClass'
import type { AppState, Habit, HabitIcon } from '../types'
import { ICON_OPTIONS } from '../types'

type Props = {
  state: AppState
  today: string
  toggle: (habitId: string) => void
  addHabit: (h: Omit<Habit, 'id' | 'createdAt'>) => void
  updateHabit: (id: string, patch: Partial<Habit>) => void
  deleteHabit: (id: string) => void
}

type EditorState =
  | { mode: 'closed' }
  | { mode: 'new' }
  | { mode: 'edit'; habit: Habit }

export const Habits = ({
  state,
  today,
  toggle,
  addHabit,
  updateHabit,
  deleteHabit,
}: Props) => {
  const [editor, setEditor] = useState<EditorState>({ mode: 'closed' })
  const todayLog = state.logs[today]?.completed ?? {}
  const completed = state.habits.filter((h) => todayLog[h.id]).length
  const total = state.habits.length
  const pct = total === 0 ? 0 : (completed / total) * 100

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-sm pt-sm">
        <h2 className="font-serif text-4xl font-bold text-on-surface">
          Hábitos de Hoje
        </h2>
        <p className="text-on-surface-variant">
          Disciplina é o atalho mais curto.
        </p>

        <div className="glass-panel rounded-xl p-md mt-sm">
          <div className="flex justify-between items-end mb-sm">
            <span className="font-semibold text-lg text-primary">
              {completed} / {total}
            </span>
            <span className="text-xs uppercase tracking-wider text-on-surface-variant">
              Concluídos
            </span>
          </div>
          <div className="h-3 w-full bg-tertiary-fixed rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-gutter">
        {state.habits.map((h) => {
          const done = !!todayLog[h.id]
          return (
            <button
              key={h.id}
              onClick={() => toggle(h.id)}
              className={`glass-panel rounded-2xl p-md flex items-center justify-between gap-md transition-all duration-300 text-left active:scale-[0.99] ${
                done ? 'bg-primary-fixed/40 border-primary-fixed' : ''
              }`}
            >
              <div className="flex items-center gap-md">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    done
                      ? 'bg-primary text-on-primary shadow-glow-primary'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <Icon name={h.icon} filled={done} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-on-surface">
                    {h.name}
                  </span>
                  <span
                    className={`text-xs uppercase tracking-wider mt-1 ${
                      done ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {h.meta}
                  </span>
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  done
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-outline-variant'
                }`}
              >
                {done && <Icon name="check" filled className="text-sm" />}
              </div>
            </button>
          )
        })}
      </section>

      <section className="flex flex-col gap-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-on-surface">
            Seus hábitos
          </h3>
          <button
            onClick={() => setEditor({ mode: 'new' })}
            className="px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-glow-primary active:scale-95 transition-transform flex items-center gap-1"
          >
            <Icon name="add" filled className="text-base" />
            Novo
          </button>
        </div>

        <div className="flex flex-col gap-sm">
          {state.habits.map((h) => (
            <div
              key={h.id}
              className="glass-panel rounded-xl p-sm flex items-center justify-between gap-sm"
            >
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <Icon name={h.icon} />
                </div>
                <div>
                  <div className="font-medium text-on-surface text-sm">
                    {h.name}
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    {h.meta}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditor({ mode: 'edit', habit: h })}
                  className="w-9 h-9 rounded-full hover:bg-surface-container active:scale-90 transition flex items-center justify-center text-on-surface-variant"
                  aria-label="Editar"
                >
                  <Icon name="edit" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Excluir "${h.name}"?`)) deleteHabit(h.id)
                  }}
                  className="w-9 h-9 rounded-full hover:bg-error-container active:scale-90 transition flex items-center justify-center text-error"
                  aria-label="Excluir"
                >
                  <Icon name="delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editor.mode !== 'closed' && (
        <HabitEditor
          initial={editor.mode === 'edit' ? editor.habit : undefined}
          onClose={() => setEditor({ mode: 'closed' })}
          onSave={(data) => {
            if (editor.mode === 'edit') updateHabit(editor.habit.id, data)
            else addHabit(data)
            setEditor({ mode: 'closed' })
          }}
        />
      )}
    </div>
  )
}

type EditorProps = {
  initial?: Habit
  onClose: () => void
  onSave: (data: { name: string; meta: string; icon: HabitIcon }) => void
}

const HabitEditor = ({ initial, onClose, onSave }: EditorProps) => {
  useBodyClass('modal-open')
  const [name, setName] = useState(initial?.name ?? '')
  const [meta, setMeta] = useState(initial?.meta ?? '')
  const [icon, setIcon] = useState<HabitIcon>(initial?.icon ?? 'favorite')

  const canSave = name.trim().length > 0

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-surface w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl flex flex-col max-h-[100dvh] sm:max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-md pb-sm shrink-0">
          <h3 className="font-serif text-2xl font-semibold text-on-surface">
            {initial ? 'Editar hábito' : 'Novo hábito'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center"
            aria-label="Fechar"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="flex flex-col gap-md px-md py-sm overflow-y-auto flex-1">
          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant">
              Nome
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Workout 1"
              className="bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant">
              Meta
            </span>
            <input
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              placeholder="ex: 45 min outdoor"
              className="bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant">
              Ícone
            </span>
            <div className="grid grid-cols-5 gap-2">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.icon}
                  type="button"
                  onClick={() => setIcon(opt.icon)}
                  className={`aspect-square rounded-xl flex items-center justify-center transition ${
                    icon === opt.icon
                      ? 'bg-primary text-on-primary shadow-glow-primary'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                  aria-label={opt.label}
                >
                  <Icon name={opt.icon} filled={icon === opt.icon} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-md pt-sm shrink-0 border-t border-outline-variant/30 bg-surface">
          <button
            type="button"
            disabled={!canSave}
            onClick={() => onSave({ name: name.trim(), meta: meta.trim(), icon })}
            className="w-full py-3 bg-primary text-on-primary font-semibold rounded-xl shadow-glow-primary disabled:opacity-50 disabled:shadow-none active:scale-[0.98] transition-transform"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
