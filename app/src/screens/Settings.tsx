import { Icon } from '../components/Icon'
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
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-surface w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-md flex flex-col gap-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold text-on-surface">
            Configurações
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center"
            aria-label="Fechar"
          >
            <Icon name="close" />
          </button>
        </div>

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
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={365}
            value={state.totalDays}
            onChange={(e) => {
              const n = Number(e.target.value)
              if (!Number.isNaN(n) && n > 0) setTotalDays(n)
            }}
            className="bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-xs text-on-surface-variant mt-1">
            Padrão: 75 (75 Hard). Mude pra 30, 90, 100…
          </span>
        </label>

        <button
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
          className="mt-sm w-full py-3 bg-error-container text-on-error-container font-semibold rounded-xl active:scale-[0.98] transition-transform"
        >
          Resetar tudo
        </button>
      </div>
    </div>
  )
}
