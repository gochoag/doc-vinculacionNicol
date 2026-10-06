import type React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TITULO } from "../theme";

const Valor: React.FC<{ texto: string; color: string; tam?: number }> = ({ texto, color, tam = 72 }) => (
  <div
    style={{
      fontFamily: FONT_TITULO,
      fontWeight: 800,
      fontSize: tam,
      color: C.blanco,
      backgroundColor: color,
      borderRadius: 999,
      padding: `4px ${tam * 0.5}px 0`,
      boxShadow: `0 12px 0 rgba(0,0,0,0.12)`,
    }}
  >
    {texto}
  </div>
);

/** Justificación: las habilidades que desarrollan los talleres. */
export const E05Justificacion: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo semilla="justificacion" manchas={[C.calma, C.verde, C.alegria]} />
      <Etiqueta numero="02" texto="¿Por qué este proyecto?" color={C.calma} />
      <Camara zoomDesde={1.08} zoomHasta={1}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <PalabrasPorBloque
            texto="Habilidades que fortalecen los talleres"
            desde={8}
            intervalo={4}
            tamano={80}
            anchoMax={1700}
            style={{ position: "absolute", top: 210 }}
          />
          <Aparecer desde={1.4 * fps} tipo="izquierda" flotar style={{ position: "absolute", left: 180, top: 470 }}>
            <Valor texto="autonomía" color={C.miedo} />
          </Aparecer>
          <Aparecer desde={1.8 * fps} tipo="arriba" flotar style={{ position: "absolute", left: 720, top: 420 }}>
            <Valor texto="empatía" color={C.rosa} tam={92} />
          </Aparecer>
          <Aparecer desde={2.2 * fps} tipo="derecha" flotar style={{ position: "absolute", left: 1260, top: 480 }}>
            <Valor texto="respeto" color={C.tristeza} />
          </Aparecer>
          <Aparecer desde={2.6 * fps} tipo="izquierda" flotar style={{ position: "absolute", left: 360, top: 660 }}>
            <Valor texto="diálogo" color={C.naranja} tam={84} />
          </Aparecer>
          <Aparecer desde={3 * fps} tipo="derecha" flotar style={{ position: "absolute", left: 900, top: 650 }}>
            <Valor texto="trabajo en equipo" color={C.verde} />
          </Aparecer>
          <Aparecer desde={4 * fps} tipo="abajo" style={{ position: "absolute", bottom: 120 }}>
            <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 64, color: C.tinta }}>
              → un entorno seguro con <span style={{ color: C.calma }}>cultura de paz</span> ☮
            </div>
          </Aparecer>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="pop" en={1.4 * fps} volumen={0.45} />
      <Sfx nombre="pop" en={1.8 * fps} volumen={0.45} />
      <Sfx nombre="pop" en={2.2 * fps} volumen={0.45} />
      <Sfx nombre="pop" en={2.6 * fps} volumen={0.45} />
      <Sfx nombre="pop" en={3 * fps} volumen={0.45} />
      <Sfx nombre="ding" en={4 * fps} volumen={0.35} />
    </AbsoluteFill>
  );
};
