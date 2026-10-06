import type React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { C, FONT_TEXTO, FONT_TITULO } from "../theme";

const Tarjeta: React.FC<{ icono: string; titulo: string; color: string }> = ({ icono, titulo, color }) => (
  <div
    style={{
      width: 460,
      height: 380,
      backgroundColor: C.blanco,
      borderRadius: 36,
      borderTop: `16px solid ${color}`,
      boxShadow: "0 24px 50px rgba(31,42,68,0.18)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      padding: 30,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 110 }}>{icono}</div>
    <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 54, lineHeight: 1.05, color: C.tinta }}>{titulo}</div>
  </div>
);

/** Identificación del problema. */
export const E04Problema: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo semilla="problema" manchas={[C.enojo, C.naranja, C.tristeza]} />
      <Etiqueta numero="01" texto="El problema" color={C.enojo} />
      <Camara zoomDesde={1} zoomHasta={1.06} golpes={[Math.round(5.4 * fps)]}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 56, paddingTop: 60 }}>
          <PalabrasPorBloque
            texto="Dificultad para reconocer, expresar y controlar las emociones"
            desde={10}
            intervalo={3}
            tamano={76}
            anchoMax={1500}
            resaltar={{ emociones: C.enojo }}
          />
          <div style={{ display: "flex", gap: 50 }}>
            <Aparecer desde={1.8 * fps} tipo="abajo">
              <Tarjeta icono="💬" titulo="Discusiones frecuentes" color={C.enojo} />
            </Aparecer>
            <Aparecer desde={2.5 * fps} tipo="abajo">
              <Tarjeta icono="✋" titulo="Conductas agresivas" color={C.naranja} />
            </Aparecer>
            <Aparecer desde={3.2 * fps} tipo="abajo">
              <Tarjeta icono="🔇" titulo="Falta de comunicación asertiva" color={C.tristeza} />
            </Aparecer>
          </div>
          <Aparecer desde={5.2 * fps} tipo="pop">
            <div style={{ fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 48, color: C.blanco, backgroundColor: C.tinta, borderRadius: 50, padding: "12px 44px" }}>
              = poca tolerancia en la convivencia del aula
            </div>
          </Aparecer>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="pop" en={1.8 * fps} volumen={0.5} />
      <Sfx nombre="pop" en={2.5 * fps} volumen={0.5} />
      <Sfx nombre="pop" en={3.2 * fps} volumen={0.5} />
      <Sfx nombre="impacto" en={5.2 * fps} volumen={0.45} />
    </AbsoluteFill>
  );
};
