import { interpolate, useCurrentFrame } from "remotion";

// Sol de Mayo estilizado: rayos rectos y flameados girando suavemente.
export const SolDeMayo: React.FC<{
  size?: number;
  color?: string;
  opacity?: number;
}> = ({ size = 600, color = "#F6B40E", opacity = 1 }) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 600], [0, 30]);
  const rays = 32;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      style={{ opacity }}
    >
      <g transform={`rotate(${rotation})`}>
        {new Array(rays).fill(0).map((_, i) => {
          const angle = (360 / rays) * i;
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={0}
              y2={-95}
              stroke={color}
              strokeWidth={i % 2 === 0 ? 3 : 1.5}
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>
      <circle cx={0} cy={0} r={26} fill={color} />
    </svg>
  );
};
