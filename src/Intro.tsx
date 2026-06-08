import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SolDeMayo } from "./SolDeMayo";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const sunRise = spring({ frame, fps, config: { damping: 200 } });
  const sunY = interpolate(sunRise, [0, 1], [400, 0]);
  const sunScale = interpolate(sunRise, [0, 1], [0.4, 1]);

  const title1 = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const title2 = interpolate(frame, [34, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a2a3a 0%, #2e1d12 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          transform: `translateY(${sunY}px) scale(${sunScale})`,
          marginBottom: 60,
        }}
      >
        <SolDeMayo size={520} color="#F6B40E" />
      </div>

      <div
        style={{
          fontSize: 150,
          fontWeight: 700,
          color: "#fffaf0",
          opacity: title1,
          transform: `translateY(${interpolate(title1, [0, 1], [30, 0])}px)`,
          letterSpacing: 4,
          textShadow: "0 6px 24px rgba(0,0,0,0.5)",
        }}
      >
        CULTURA
      </div>
      <div
        style={{
          fontSize: 150,
          fontWeight: 700,
          color: "#F6B40E",
          opacity: title2,
          transform: `translateY(${interpolate(title2, [0, 1], [30, 0])}px)`,
          letterSpacing: 8,
          textShadow: "0 6px 24px rgba(0,0,0,0.5)",
        }}
      >
        CRIOLLA
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 46,
          color: "#d9c7a3",
          opacity: title2,
          fontStyle: "italic",
          letterSpacing: 2,
        }}
      >
        Raíz, tierra y tradición
      </div>
    </AbsoluteFill>
  );
};
