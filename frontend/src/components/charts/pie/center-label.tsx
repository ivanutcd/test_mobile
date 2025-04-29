import { useDrawingArea } from '@mui/x-charts';

interface PieCenterLabelProps {
  lines: string[];
  color?: string;
}

export const PieCenterLabel: React.FC<PieCenterLabelProps> = ({
  lines,
  color = 'black',
}) => {
  const { width, height, left, top } = useDrawingArea();

  return (
    <text
      x={left + width / 2}
      y={top + height / 2.2}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fill: color }}
    >
      {lines.map((line, index) => (
        <tspan
          key={index}
          x={left + width / 2}
          dy={index === 0 ? 0 : '1.6em'}
          style={{
            fontSize: index === 0 ? '28px' : '20px',
            fontWeight: '600',
          }}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
};
