import React from 'react';

interface RadarChartProps {
  data: {
    decisiveness: number;
    intuition: number;
    charisma: number;
    resilience: number;
    boundaries: number;
  };
  accentColor?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 260;
  const center = size / 2;
  const radius = 88;

  const axes = [
    { label: '决策魄力', value: data.decisiveness, angle: -Math.PI / 2 },
    { label: '灵感洞察', value: data.intuition, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { label: '气场魅力', value: data.charisma, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { label: '精神韧性', value: data.resilience, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { label: '边界防线', value: data.boundaries, angle: -Math.PI / 2 + (8 * Math.PI) / 5 },
  ];

  // Concentric polygon circles
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getPolygonPoints = (scale: number) => {
    return axes
      .map((axis) => {
        const x = center + radius * scale * Math.cos(axis.angle);
        const y = center + radius * scale * Math.sin(axis.angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Data polygon points
  const dataPoints = axes
    .map((axis) => {
      const scale = Math.min(Math.max(axis.value / 100, 0.2), 1.0);
      const x = center + radius * scale * Math.cos(axis.angle);
      const y = center + radius * scale * Math.sin(axis.angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center py-2" id="radar-chart-container">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grids */}
        {levels.map((level, i) => (
          <polygon
            key={i}
            points={getPolygonPoints(level)}
            fill={i === levels.length - 1 ? 'rgba(245, 158, 11, 0.03)' : 'none'}
            stroke="rgba(148, 163, 184, 0.35)"
            strokeWidth="1"
            strokeDasharray={i < levels.length - 1 ? '3 3' : undefined}
          />
        ))}

        {/* Axes lines */}
        {axes.map((axis, i) => {
          const x2 = center + radius * Math.cos(axis.angle);
          const y2 = center + radius * Math.sin(axis.angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon filled with subtle warm amber-purple wash */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <polygon
          points={dataPoints}
          fill="url(#radarGradient)"
          stroke="#d97706"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {/* Vertices points */}
        {axes.map((axis, i) => {
          const scale = Math.min(Math.max(axis.value / 100, 0.2), 1.0);
          const cx = center + radius * scale * Math.cos(axis.angle);
          const cy = center + radius * scale * Math.sin(axis.angle);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="2"
            />
          );
        })}

        {/* Axis Labels & Values */}
        {axes.map((axis, i) => {
          const labelDist = radius + 24;
          const lx = center + labelDist * Math.cos(axis.angle);
          const ly = center + labelDist * Math.sin(axis.angle);
          return (
            <g key={`lbl-${i}`}>
              <text
                x={lx}
                y={ly - 4}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-medium fill-slate-600 select-none font-sans"
              >
                {axis.label}
              </text>
              <text
                x={lx}
                y={ly + 10}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-bold fill-amber-700 select-none font-mono"
              >
                {axis.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
