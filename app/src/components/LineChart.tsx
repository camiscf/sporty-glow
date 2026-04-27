import { useMemo } from 'react'

type Point = {
  day: number
  value: number
  date: string
}

type Props = {
  points: Point[]
  yMax: number
  height?: number
}

export const LineChart = ({ points, yMax, height = 200 }: Props) => {
  const padding = { top: 16, right: 16, bottom: 28, left: 28 }
  const innerH = height - padding.top - padding.bottom

  const avg = useMemo(() => {
    if (points.length === 0) return 0
    return points.reduce((s, p) => s + p.value, 0) / points.length
  }, [points])

  if (points.length === 0 || yMax === 0) {
    return (
      <div className="text-sm text-on-surface-variant text-center py-md">
        Sem dados ainda.
      </div>
    )
  }

  const innerW = 600
  const totalW = innerW + padding.left + padding.right

  const xMin = 1
  const xMax = Math.max(points[points.length - 1].day, 1)
  const xRange = Math.max(1, xMax - xMin)

  const xPos = (day: number) =>
    padding.left + ((day - xMin) / xRange) * innerW
  const yPos = (v: number) =>
    padding.top + innerH - (v / yMax) * innerH

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xPos(p.day)} ${yPos(p.value)}`)
    .join(' ')

  const yTicks: number[] = []
  for (let i = 0; i <= yMax; i++) yTicks.push(i)

  const tickStep = xMax <= 10 ? 1 : xMax <= 30 ? 5 : xMax <= 75 ? 10 : 15
  const xTicks: number[] = []
  for (let d = 1; d <= xMax; d++) {
    if (d === 1 || d === xMax || d % tickStep === 0) xTicks.push(d)
  }

  return (
    <svg
      viewBox={`0 0 ${totalW} ${height}`}
      className="w-full h-auto"
      preserveAspectRatio="none"
    >
      {yTicks.map((t) => (
        <line
          key={`y-${t}`}
          x1={padding.left}
          x2={padding.left + innerW}
          y1={yPos(t)}
          y2={yPos(t)}
          stroke="#dee3e3"
          strokeWidth={1}
        />
      ))}

      {yTicks.map((t) => (
        <text
          key={`yl-${t}`}
          x={padding.left - 6}
          y={yPos(t) + 4}
          textAnchor="end"
          fontSize="10"
          fill="#3f4947"
          fontFamily="Lexend, sans-serif"
        >
          {t}
        </text>
      ))}

      {xTicks.map((d) => (
        <text
          key={`xl-${d}`}
          x={xPos(d)}
          y={height - 8}
          textAnchor="middle"
          fontSize="10"
          fill="#3f4947"
          fontFamily="Lexend, sans-serif"
        >
          {d}
        </text>
      ))}

      <line
        x1={padding.left}
        x2={padding.left + innerW}
        y1={yPos(avg)}
        y2={yPos(avg)}
        stroke="#4a607c"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />
      <text
        x={padding.left + innerW - 4}
        y={yPos(avg) - 4}
        textAnchor="end"
        fontSize="10"
        fill="#4a607c"
        fontFamily="Lexend, sans-serif"
        fontWeight={600}
      >
        média {avg.toFixed(1)}
      </text>

      <path
        d={linePath}
        fill="none"
        stroke="#40e0d0"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {points.map((p) => (
        <g key={p.day}>
          <circle
            cx={xPos(p.day)}
            cy={yPos(p.value)}
            r={4}
            fill="#40e0d0"
            stroke="#ffffff"
            strokeWidth={2}
          >
            <title>{`Dia ${p.day} (${p.date}): ${p.value}`}</title>
          </circle>
        </g>
      ))}
    </svg>
  )
}
