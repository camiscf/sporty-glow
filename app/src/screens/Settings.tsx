import { useState } from 'react'
import { Icon } from '../components/Icon'
import { useBodyClass } from '../hooks/useBodyClass'
import type { AppState } from '../types'
import { formatBR } from '../utils'

type Props = {
  state: AppState
  setStartDate: (iso: string) => void
  setTotalDays: (n: number) => void
  resetAll: () => void
  onClose: () => void
}

export const Settings = ({
  state,
  setStartDate,
  setTotalDays,
  resetAll,
  onClose,
}: Props) => {
  useBodyClass('modal-open')
  const [daysInput, setDaysInput] = useState(String(state.totalDays))

  const commitDays = () => {
    const n = Number(daysInput)
    if (!Number.isNaN(n) && n >= 1 && n <= 365) {
      setTotalDays(n)
      setDaysInput(String(Math.floor(n)))
    } else {
      setDaysInput(String(state.totalDays))
    }
  }

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
            Configurações
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
              Início do desafio
            </span>
            <input
              type="date"
              value={state.startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="text-xs text-on-surface-variant mt-1">
              {formatBR(state.startDate)}
            </span>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant">
              Duração (dias)
            </span>
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={365}
                value={daysInput}
                onChange={(e) => setDaysInput(e.target.value)}
                onBlur={commitDays}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    commitDays()
                    ;(e.target as HTMLInputElement).blur()
                  }
                }}
                className="flex-1 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={commitDays}
                className="px-4 rounded-xl bg-primary text-on-primary font-semibold active:scale-95 transition-transform"
              >
                OK
              </button>
            </div>
            <span className="text-xs text-on-surface-variant mt-1">
              Atual: {state.totalDays} dias. Padrão: 75 (75 Hard).
            </span>
          </label>
        </div>

        <div className="p-md pt-sm shrink-0 border-t border-outline-variant/30 bg-surface">
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  'Tem certeza? Isso apaga todo o progresso e volta aos hábitos padrão.',
                )
              ) {
                resetAll()
                onClose()
              }
            }}
            className="w-full py-3 bg-error-container text-on-error-container font-semibold rounded-xl active:scale-[0.98] transition-transform"
          >
            Resetar tudo
          </button>
        </div>
      </div>
    </div>
  )
}
