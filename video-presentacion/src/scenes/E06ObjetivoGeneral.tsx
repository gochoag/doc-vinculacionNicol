import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TEXTO } from "../theme";

/** Diana animada con flecha que da en el centro. */
const Diana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const llegada = Math.round(1.2 * fps);
  return (
    <svg viewBox="0 0 400 400" width={420} style={{ overflow: "visible" }}>
      {[180, 140, 100, 60, 24].map((r, i) => (
        <circle
          key={r}
          cx={200}
          cy={200}
          r={r * interpolate(frame, [i * 3, i * 3 + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) })}
          fill={i % 2 === 0 ? C.enojo : C.blanco}
          stroke={C.tinta}
          strokeWidth={6}
        />
      ))}
      <g
        transform={`translate(${interpolate(frame, [0.6 * fps, llegada], [500, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) })} ${interpolate(frame, [0.6 * fps, llegada], [-500, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) })}) rotate(${frame > llegada ? Math.sin((frame - llegada) * 1.2) * Math.max(0, 8 - (frame - llegada) * 0.4) : 0} 200 200)`}
      >
        <line x1={200} y1={200} x2={340} y2={60} stroke={C.tinta} strokeWidth={10} strokeLinecap="round" />
        <path d="M340 60 L360 30 L370 70 Z M340 60 L310 50 L350 40 Z" fill={C.alegria} stroke={C.tinta} strokeWidth={4} />
      </g>
    </svg>
  );
};

/** Objetivo general del proyecto. */
export const E06ObjetivoGeneral: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo semilla="objetivo" manchas={[C.alegria, C.enojo, C.rosa]} />
      <Etiqueta numero="03" texto="Objetivo general" color={C.naranja} />
      <Camara zoomDesde={1} zoomHasta={1.07} golpes={[Math.round(1.2 * fps)]} origen="30% 50%">
        <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "100px 120px 0", gap: 80 }}>
          <Diana />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 40 }}>
            <PalabrasPorBloque
              texto="Fortalecer el manejo de las emociones y la resolución pacífica de conflictos"
              desde={Math.round(1.3 * fps)}
              intervalo={3}
              tamano={78}
              alinear="left"
              anchoMax={1100}
              resaltar={{ fortalecer: C.naranja, emociones: C.miedo, pacífica: C.calma }}
            />
            <div
              style={{
                fontFamily: FONT_TEXTO,
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.3,
                color: C.tintaSuave,
                maxWidth: 1050,
                opacity: interpolate(frame, [3.6 * fps, 4.2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                translate: interpolate(frame, [3.6 * fps, 4.2 * fps], ["-40px 0px", "0px 0px"], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }),
              }}
            >
              …mediante talleres participativos que promuevan una convivencia escolar respetuosa.
            </div>
          </div>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="whoosh" en={0.6 * fps} volumen={0.4} />
      <Sfx nombre="impacto" en={1.2 * fps - 1} volumen={0.5} />
    </AbsoluteFill>
  );
};
