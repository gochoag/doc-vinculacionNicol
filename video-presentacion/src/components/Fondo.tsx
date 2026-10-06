import type React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../theme";

type Props = {
  readonly base?: string;
  readonly manchas?: string[];
  readonly semilla?: string;
  /** Dibuja confeti/figuras flotando. */
  readonly figuras?: boolean;
};

/** Fondo vivo: color base, manchas de color que se mueven y figuras flotando. */
export const Fondo: React.FC<Props> = ({
  base = C.crema,
  manchas = [C.alegria, C.calma, C.rosa],
  semilla = "fondo",
  figuras = true,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: base, overflow: "hidden" }}>
      {manchas.map((color, i) => {
        const x = random(`${semilla}-x-${i}`) * width;
        const y = random(`${semilla}-y-${i}`) * height;
        const r = 380 + random(`${semilla}-r-${i}`) * 300;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - r,
              top: y - r,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}66 0%, ${color}00 70%)`,
              translate: `${Math.sin(frame / 60 + i * 2) * 80}px ${Math.cos(frame / 70 + i) * 60}px`,
            }}
          />
        );
      })}
      {figuras
        ? new Array(14).fill(0).map((_, i) => {
            const tipo = i % 3;
            const color = [C.alegria, C.calma, C.enojo, C.tristeza, C.verde, C.miedo][i % 6];
            const x = random(`${semilla}-fx-${i}`) * width;
            const yBase = random(`${semilla}-fy-${i}`) * height;
            const tam = 14 + random(`${semilla}-ft-${i}`) * 22;
            const vel = 0.4 + random(`${semilla}-fv-${i}`) * 0.8;
            const y = ((yBase - frame * vel) % (height + 100) + height + 100) % (height + 100) - 50;
            return (
              <div
                key={`f${i}`}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: tam,
                  height: tam,
                  opacity: 0.55,
                  backgroundColor: tipo === 2 ? "transparent" : color,
                  border: tipo === 2 ? `4px solid ${color}` : undefined,
                  borderRadius: tipo === 1 ? 4 : "50%",
                  rotate: `${frame * vel * 2 + i * 40}deg`,
                }}
              />
            );
          })
        : null}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(31,42,68,0.18) 100%)",
          opacity: interpolate(frame, [0, 30], [0.6, 1], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
