import type React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TEXTO, FONT_TITULO } from "../theme";

const Objetivo: React.FC<{ n: string; verbo: string; texto: string; color: string }> = ({ n, verbo, texto, color }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 36,
      width: 1500,
      backgroundColor: C.blanco,
      borderRadius: 34,
      padding: "26px 40px",
      boxShadow: "0 18px 40px rgba(31,42,68,0.14)",
    }}
  >
    <div
      style={{
        width: 110,
        height: 110,
        flexShrink: 0,
        borderRadius: "50%",
        backgroundColor: color,
        color: C.blanco,
        fontFamily: FONT_TITULO,
        fontWeight: 800,
        fontSize: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 8,
      }}
    >
      {n}
    </div>
    <div>
      <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 64, color, lineHeight: 1 }}>{verbo}</div>
      <div style={{ fontFamily: FONT_TEXTO, fontWeight: 700, fontSize: 42, color: C.tinta, marginTop: 6 }}>{texto}</div>
    </div>
  </div>
);

/** Los tres objetivos específicos. */
export const E07ObjetivosEspecificos: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo semilla="especificos" manchas={[C.tristeza, C.calma, C.verde]} />
      <Etiqueta numero="03" texto="Objetivos específicos" color={C.tristeza} />
      <Camara zoomDesde={1} zoomHasta={1.05}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 34, paddingTop: 90 }}>
          <PalabrasPorBloque texto="Tres pasos para lograrlo" desde={6} intervalo={4} tamano={80} />
          <Aparecer desde={1 * fps} tipo="izquierda">
            <Objetivo n="1" verbo="Identificar" texto="las dificultades y ayudar a reconocer y expresar emociones" color={C.tristeza} />
          </Aparecer>
          <Aparecer desde={2.2 * fps} tipo="derecha">
            <Objetivo n="2" verbo="Desarrollar" texto="actividades para el manejo emocional y el autocontrol" color={C.calma} />
          </Aparecer>
          <Aparecer desde={3.4 * fps} tipo="izquierda">
            <Objetivo n="3" verbo="Fomentar" texto="la participación para una mejor convivencia" color={C.verde} />
          </Aparecer>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="whoosh" en={1 * fps} volumen={0.35} />
      <Sfx nombre="whoosh" en={2.2 * fps} volumen={0.35} />
      <Sfx nombre="whoosh" en={3.4 * fps} volumen={0.35} />
    </AbsoluteFill>
  );
};
