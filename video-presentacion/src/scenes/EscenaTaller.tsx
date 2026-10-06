import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import {
  IlusCaritas,
  IlusJuntos,
  IlusMesaPaz,
  IlusPacto,
  IlusRespiro,
  IlusSemaforo,
} from "../illustrations/Actividades";
import { C, FONT_TEXTO, FONT_TITULO } from "../theme";

const ILUSTRACIONES = {
  caritas: IlusCaritas,
  semaforo: IlusSemaforo,
  respiro: IlusRespiro,
  mesa: IlusMesaPaz,
  juntos: IlusJuntos,
  pacto: IlusPacto,
};

export type EscenaTallerProps = {
  readonly numero: number;
  readonly fase: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly color: string;
  readonly ilustracion: keyof typeof ILUSTRACIONES;
  /** Lado en el que va la ilustración, para alternar la composición. */
  readonly lado: "izquierda" | "derecha";
};

/** Un taller: texto a un lado e ilustración animada (b-roll) al otro. */
export const EscenaTaller: React.FC<EscenaTallerProps> = ({ numero, fase, titulo, descripcion, color, ilustracion, lado }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const Ilus = ILUSTRACIONES[ilustracion];

  const texto = (
    <div style={{ width: 860, display: "flex", flexDirection: "column", gap: 26 }}>
      <Aparecer desde={2} tipo={lado === "derecha" ? "izquierda" : "derecha"}>
        <div style={{ display: "inline-flex", fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 36, color: C.blanco, backgroundColor: color, borderRadius: 40, padding: "8px 28px", letterSpacing: 2 }}>
          {fase.toUpperCase()}
        </div>
      </Aparecer>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
        <div
          style={{
            fontFamily: FONT_TITULO,
            fontWeight: 800,
            fontSize: 190,
            lineHeight: 0.8,
            color,
            WebkitTextStroke: `6px ${C.tinta}`,
            scale: interpolate(frame, [6, 6 + 0.5 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          {numero}
        </div>
        <PalabrasPorBloque texto={titulo} desde={12} intervalo={4} tamano={86} alinear="left" anchoMax={680} />
      </div>
      <div
        style={{
          fontFamily: FONT_TEXTO,
          fontWeight: 700,
          fontSize: 44,
          lineHeight: 1.3,
          color: C.tintaSuave,
          opacity: interpolate(frame, [1.3 * fps, 1.9 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [1.3 * fps, 1.9 * fps], ["0px 30px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {descripcion}
      </div>
    </div>
  );

  const ilus = (
    <div style={{ width: 860, height: 820, position: "relative" }}>
      <Camara zoomDesde={1.12} zoomHasta={0.96} origen="50% 50%">
        <Ilus />
      </Camara>
    </div>
  );

  return (
    <AbsoluteFill>
      <Fondo semilla={`taller-${numero}`} manchas={[color, C.alegria, C.blanco]} />
      <Camara zoomDesde={1} zoomHasta={1.04}>
        <AbsoluteFill
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "60px 100px",
          }}
        >
          {lado === "izquierda" ? ilus : texto}
          {lado === "izquierda" ? texto : ilus}
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="pop" en={6} volumen={0.5} />
    </AbsoluteFill>
  );
};
