type Props = {
  name: string
  filled?: boolean
  className?: string
}

export const Icon = ({ name, filled, className = '' }: Props) => (
  <span className={`material-symbols-outlined${filled ? ' filled' : ''} ${className}`}>
    {name}
  </span>
)
