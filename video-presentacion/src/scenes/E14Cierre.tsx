import type React from "react";
import { AbsoluteFill, Easing, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TEXTO } from "../theme";

/** Lluvia de confeti. */
const Confeti: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const colores = [C.alegria, C.calma, C.enojo, C.tristeza, C.verde, C.miedo, C.rosa];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(80).fill(0).map((_, i) => {
        const x = random(`cx${i}`) * width;
        const vel = 9 + random(`cv${i}`) * 8;
        const y = -60 + (frame - random(`cd${i}`) * 30) * vel;
        if (y < -60 || y > height + 60) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(frame / 8 + i) * 30,
              top: y,
              width: 18,
              height: 30,
              borderRadius: 4,
              backgroundColor: colores[i % colores.length],
              rotate: `${frame * (5 + (i % 7)) + i * 30}deg`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Cierre: agradecimiento y créditos. */
export const E14Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo base={C.crema} semilla="cierre" manchas={[C.alegria, C.rosa, C.calma]} />
      <Confeti />
      <Camara zoomDesde={1.12} zoomHasta={1} golpes={[8]}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 26 }}>
          <PalabrasPorBloque texto="¡Gracias!" desde={4} intervalo={4} tamano={230} resaltar={{ gracias: C.enojo }} />
          <PalabrasPorBloque
            texto="Juntos construimos un aula con más calma, respeto y diálogo"
            desde={Math.round(0.8 * fps)}
            intervalo={3}
            tamano={54}
            color={C.tintaSuave}
            anchoMax={1400}
          />
          <Aparecer
            desde={2 * fps}
            tipo="abajo"
            style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 30, backgroundColor: C.blanco, borderRadius: 30, padding: "20px 40px 20px 20px", boxShadow: "0 20px 50px rgba(31,42,68,0.18)" }}
          >
            <Img src={staticFile("img/logo-jatun-yachay-wasi.jpeg")} style={{ height: 150, borderRadius: 16, backgroundColor: C.blanco, padding: 8 }} />
            <div style={{ fontFamily: FONT_TEXTO, color: C.tinta, textAlign: "left" }}>
              <div style={{ fontWeight: 800, fontSize: 44 }}>Nickol Alejandra Castillo Caicedo</div>
              <div style={{ fontWeight: 700, fontSize: 32, color: C.tintaSuave }}>Educación Básica Intercultural Bilingüe</div>
              <div style={{ fontWeight: 700, fontSize: 32, color: C.tintaSuave }}>ISTJYW · San Lorenzo, Esmeraldas · 2026</div>
            </div>
          </Aparecer>
        </AbsoluteFill>
      </Camara>
      {/* fundido a negro final */}
      <AbsoluteFill
        style={{
          backgroundColor: C.noche,
          opacity: interpolate(frame, [durationInFrames - 0.8 * fps, durationInFrames], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.in(Easing.quad),
          }),
        }}
      />
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="impacto" en={4} volumen={0.6} />
      <Sfx nombre="pop" en={2 * fps} volumen={0.45} />
    </AbsoluteFill>
  );
};
