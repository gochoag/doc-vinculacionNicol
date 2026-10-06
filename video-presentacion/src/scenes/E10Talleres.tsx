import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { C, FONT_TITULO } from "../theme";

/** Contador grande: 6 talleres · 5 fases · 5 semanas. */
export const E10Talleres: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cifras = [
    { n: 6, texto: "talleres", color: C.enojo, desde: 0.2 * fps },
    { n: 5, texto: "fases", color: C.calma, desde: 0.6 * fps },
    { n: 5, texto: "semanas", color: C.miedo, desde: 1 * fps },
  ];

  return (
    <AbsoluteFill>
      <Fondo base={C.alegria} semilla="talleres" manchas={[C.naranja, C.blanco, C.rosa]} />
      <Etiqueta numero="06" texto="Actividades" color={C.tinta} />
      <Camara zoomDesde={1.15} zoomHasta={1}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 100 }}>
          {cifras.map((c) => (
            <div
              key={c.texto}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                scale: interpolate(frame, [c.desde, c.desde + 0.5 * fps], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                  output: "perceptual-scale",
                }),
              }}
            >
              <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 300, lineHeight: 0.9, color: c.color, textShadow: `0 14px 0 ${C.tinta}` }}>
                {Math.round(interpolate(frame, [c.desde, c.desde + 0.6 * fps], [0, c.n], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}
              </div>
              <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 80, color: C.tinta }}>{c.texto}</div>
            </div>
          ))}
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="pop" en={0.2 * fps} volumen={0.5} />
      <Sfx nombre="pop" en={0.6 * fps} volumen={0.5} />
      <Sfx nombre="pop" en={1 * fps} volumen={0.5} />
    </AbsoluteFill>
  );
};
