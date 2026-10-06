import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TEXTO, FONT_TITULO } from "../theme";

/** Tarjeta que entra girando en 3D. */
const Enfoque: React.FC<{ desde: number; icono: string; titulo: string; texto: string; color: string }> = ({
  desde,
  icono,
  titulo,
  texto,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ perspective: 1400 }}>
      <div
        style={{
          width: 500,
          height: 560,
          borderRadius: 40,
          backgroundColor: color,
          color: C.blanco,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 18,
          padding: 40,
          boxShadow: "0 24px 50px rgba(31,42,68,0.25)",
          opacity: interpolate(frame, [desde, desde + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `rotateY(${interpolate(frame, [desde, desde + 0.8 * fps], [90, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.34, 1.3, 0.64, 1),
          })}deg)`,
        }}
      >
        <div style={{ fontSize: 120 }}>{icono}</div>
        <div style={{ fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 32, letterSpacing: 4, opacity: 0.85 }}>ENFOQUE</div>
        <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 76, lineHeight: 1 }}>{titulo}</div>
        <div style={{ fontFamily: FONT_TEXTO, fontWeight: 700, fontSize: 40, lineHeight: 1.2 }}>{texto}</div>
      </div>
    </div>
  );
};

/** Metodología: tres enfoques. */
export const E09Metodologia: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo semilla="metodologia" manchas={[C.miedo, C.tristeza, C.rosa]} />
      <Etiqueta numero="05" texto="Metodología" color={C.miedo} />
      <Camara zoomDesde={1} zoomHasta={1.06} golpes={[Math.round(3.4 * fps)]}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 50, paddingTop: 80 }}>
          <PalabrasPorBloque texto="Tres enfoques que se complementan" desde={6} intervalo={4} tamano={80} resaltar={{ tres: C.miedo }} />
          <div style={{ display: "flex", gap: 50 }}>
            <Enfoque desde={Math.round(1.2 * fps)} icono="📚" titulo="Educativo" texto="Aprender qué son las emociones" color={C.tristeza} />
            <Enfoque desde={Math.round(2 * fps)} icono="🙌" titulo="Participativo" texto="Practicar con los compañeros" color={C.naranja} />
            <Enfoque desde={Math.round(2.8 * fps)} icono="🤲" titulo="Asistencial" texto="Acompañar de cerca a quien más lo necesita" color={C.calma} />
          </div>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="whoosh" en={1.2 * fps} volumen={0.35} />
      <Sfx nombre="whoosh" en={2 * fps} volumen={0.35} />
      <Sfx nombre="whoosh" en={2.8 * fps} volumen={0.35} />
    </AbsoluteFill>
  );
};
