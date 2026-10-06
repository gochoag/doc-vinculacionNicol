import type React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Camara } from "../components/Camara";
import { Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TEXTO } from "../theme";

/** Portada: logo del instituto, nombre y carrera. */
export const E01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const impacto = Math.round(1.1 * fps);

  return (
    <AbsoluteFill>
      <Fondo base={C.noche} manchas={[C.tristeza, C.miedo, C.calma]} semilla="intro" />
      <Camara zoomDesde={1.0} zoomHasta={1.1} golpes={[impacto]}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              width: 250,
              height: 330,
              borderRadius: 30,
              backgroundColor: C.blanco,
              padding: 18,
              boxShadow: `0 0 0 10px ${C.alegria}, 0 30px 80px rgba(0,0,0,0.5)`,
              scale: interpolate(frame, [0.2 * fps, impacto], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                output: "perceptual-scale",
              }),
              rotate: interpolate(frame, [0.2 * fps, impacto], ["-200deg", "0deg"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            <Img src={staticFile("img/logo-jatun-yachay-wasi.jpeg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <PalabrasPorBloque
            texto="Instituto Superior Tecnológico"
            desde={impacto + 4}
            intervalo={3}
            tamano={48}
            color={C.arena}
            fuente={FONT_TEXTO}
          />
          <PalabrasPorBloque
            texto="JATUN YACHAY WASI"
            desde={impacto + 14}
            intervalo={5}
            tamano={120}
            color={C.blanco}
            resaltar={{ jatun: C.enojo, yachay: C.alegria, wasi: C.calma }}
          />
          <div
            style={{
              marginTop: 10,
              fontFamily: FONT_TEXTO,
              fontWeight: 800,
              fontSize: 44,
              color: C.alegria,
              letterSpacing: 2,
              opacity: interpolate(frame, [2.4 * fps, 3 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              translate: interpolate(frame, [2.4 * fps, 3 * fps], ["0px 30px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            PROYECTO DE VINCULACIÓN CON LA SOCIEDAD
          </div>
          <div
            style={{
              fontFamily: FONT_TEXTO,
              fontWeight: 700,
              fontSize: 36,
              color: C.arena,
              opacity: interpolate(frame, [2.9 * fps, 3.5 * fps], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            Carrera: Educación Básica Intercultural Bilingüe
          </div>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="riser" en={0} volumen={0.5} />
      <Sfx nombre="impacto" en={impacto - 2} volumen={0.8} />
      <Sfx nombre="pop" en={impacto + 14} volumen={0.4} />
      <Sfx nombre="pop" en={impacto + 19} volumen={0.4} />
      <Sfx nombre="pop" en={impacto + 24} volumen={0.4} />
    </AbsoluteFill>
  );
};
