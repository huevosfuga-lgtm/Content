import { AbsoluteFill, Series } from "remotion";
import { Intro } from "./Intro";
import { Scene } from "./Scene";
import { Outro } from "./Outro";

const SCENES = [
  {
    emoji: "🧉",
    title: "El Mate",
    subtitle: "Más que una infusión: una ronda, una charla, un encuentro.",
    accent: "#75AADB",
    bg: "linear-gradient(180deg, #2e3b1d 0%, #1c2511 100%)",
  },
  {
    emoji: "🔥",
    title: "El Asado",
    subtitle: "Fuego lento, paciencia y la mesa llena de amigos.",
    accent: "#F6B40E",
    bg: "linear-gradient(180deg, #3b1d12 0%, #200d08 100%)",
  },
  {
    emoji: "🎶",
    title: "El Folklore",
    subtitle: "Zamba y chacarera, el latido de nuestra tierra.",
    accent: "#c0392b",
    bg: "linear-gradient(180deg, #2a1d3b 0%, #15102a 100%)",
  },
  {
    emoji: "🐎",
    title: "El Gaucho",
    subtitle: "Coraje, libertad y tradición a caballo por el campo.",
    accent: "#cd853f",
    bg: "linear-gradient(180deg, #3a2e1a 0%, #221a0d 100%)",
  },
];

export const CulturaCriolla: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a2a3a" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <Intro />
        </Series.Sequence>

        {SCENES.map((s) => (
          <Series.Sequence key={s.title} durationInFrames={90}>
            <Scene {...s} />
          </Series.Sequence>
        ))}

        <Series.Sequence durationInFrames={90}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
