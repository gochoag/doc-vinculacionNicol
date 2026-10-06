import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { Aula } from "../illustrations/Aula";
import { C, FONT_TITULO } from "../theme";

const LOGROS = [
  { texto: "Reconocen y nombran sus emociones", color: C.alegria },
  { texto: "Usan técnicas sencillas para calmarse", color: C.calma },
  { texto: "Resuelven sus diferencias dialogando", color: C.tristeza },
  { texto: "Más respeto y trabajo en equipo", color: C.verde },
];

/** Evaluación: lo que se observó en los niños, sobre el b-roll del aula feliz. */
export const E12Logros: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: C.crema }}>
      <Camara zoomDesde={1.3} zoomHasta={1.05} origen="60% 60%">
        <AbsoluteFill style={{ filter: "blur(6px)" }}>
          <Aula tono="dia" emociones={["feliz", "calmado", "feliz", "feliz"]} pizarra="¡Lo logramos!" />
        </AbsoluteFill>
      </Camara>
      <AbsoluteFill style={{ backgroundColor: "rgba(255,247,236,0.55)" }} />
      <Etiqueta numero="08" texto="Evaluación y logros" color={C.verde} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 28, paddingTop: 90 }}>
        <PalabrasPorBloque texto="Lo que observamos en los niños" desde={6} intervalo={4} tamano={80} />
        {LOGROS.map((l, i) => {
          const inicio = 1.2 * fps + i * 0.9 * fps;
          return (
            <div
              key={l.texto}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                width: 1300,
                backgroundColor: C.blanco,
                borderRadius: 30,
                padding: "18px 34px",
                boxShadow: "0 16px 40px rgba(31,42,68,0.16)",
                opacity: interpolate(frame, [inicio, inicio + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                translate: interpolate(frame, [inicio, inicio + 0.5 * fps], ["0px 60px", "0px 0px"], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }),
              }}
            >
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 24,
                  backgroundColor: l.color,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 58,
                  color: C.blanco,
                  fontWeight: 900,
                  scale: interpolate(frame, [inicio + 8, inicio + 18], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                  }),
                }}
              >
                ✓
              </div>
              <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 58, color: C.tinta }}>{l.texto}</div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="ding" en={1.2 * fps + 8} volumen={0.4} />
      <Sfx nombre="ding" en={2.1 * fps + 8} volumen={0.4} />
      <Sfx nombre="ding" en={3 * fps + 8} volumen={0.4} />
      <Sfx nombre="ding" en={3.9 * fps + 8} volumen={0.4} />
    </AbsoluteFill>
  );
};
