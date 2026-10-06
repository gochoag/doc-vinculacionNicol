import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TEXTO, FONT_TITULO } from "../theme";

const SEMANAS = [
  { taller: "Conociendo nuestras emociones + Semáforo", color: C.alegria },
  { taller: "Respiro, pienso y actúo", color: C.calma },
  { taller: "La mesa de la paz", color: C.tristeza },
  { taller: "Juntos lo logramos", color: C.verde },
  { taller: "Nuestro pacto de convivencia", color: C.miedo },
];

/** Cronograma: línea de tiempo de cinco semanas. */
export const E11Cronograma: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const x0 = 300;
  const ancho = 1320;
  const progreso = interpolate(frame, [0.6 * fps, 4.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <Fondo semilla="cronograma" manchas={[C.calma, C.alegria, C.miedo]} />
      <Etiqueta numero="07" texto="Cronograma" color={C.calma} />
      <Camara zoomDesde={1.1} zoomHasta={1} panDesde={[-80, 0]} panHasta={[0, 0]}>
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 220, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <PalabrasPorBloque texto="Cinco semanas de talleres" desde={6} intervalo={4} tamano={84} resaltar={{ cinco: C.calma }} />
          </div>
          {/* línea */}
          <div style={{ position: "absolute", left: x0, top: 590, width: ancho, height: 16, borderRadius: 8, backgroundColor: "rgba(31,42,68,0.12)" }} />
          <div style={{ position: "absolute", left: x0, top: 590, width: ancho * progreso, height: 16, borderRadius: 8, backgroundColor: C.tinta }} />
          {SEMANAS.map((s, i) => {
            const x = x0 + (ancho / (SEMANAS.length - 1)) * i;
            const llega = 0.6 * fps + (3.6 * fps * i) / (SEMANAS.length - 1);
            return (
              <div key={s.taller}>
                <div
                  style={{
                    position: "absolute",
                    left: x - 60,
                    top: 538,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: s.color,
                    border: `8px solid ${C.tinta}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_TITULO,
                    fontWeight: 800,
                    fontSize: 64,
                    color: C.tinta,
                    paddingTop: 8,
                    scale: interpolate(frame, [llega, llega + 0.4 * fps], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                    }),
                  }}
                >
                  {i + 1}
                </div>
                <Aparecer desde={llega + 4} tipo={i % 2 ? "arriba" : "abajo"} style={{ position: "absolute", left: x - 160, top: i % 2 ? 360 : 700, width: 320, textAlign: "center" }}>
                  <div style={{ fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 30, color: C.tintaSuave, letterSpacing: 3 }}>SEMANA {i + 1}</div>
                  <div style={{ fontFamily: FONT_TITULO, fontWeight: 700, fontSize: 40, lineHeight: 1.05, color: C.tinta }}>{s.taller}</div>
                </Aparecer>
              </div>
            );
          })}
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="tick" en={0.6 * fps} volumen={0.5} />
      <Sfx nombre="tick" en={1.5 * fps} volumen={0.5} />
      <Sfx nombre="tick" en={2.4 * fps} volumen={0.5} />
      <Sfx nombre="tick" en={3.3 * fps} volumen={0.5} />
      <Sfx nombre="ding" en={4.2 * fps} volumen={0.35} />
    </AbsoluteFill>
  );
};
