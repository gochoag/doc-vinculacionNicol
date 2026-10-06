import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Sfx } from "../components/Etiqueta";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { Aula } from "../illustrations/Aula";
import { C, FONT_TITULO } from "../theme";

/** B-roll del aula: el punto de partida del proyecto. */
export const E03Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: C.noche }}>
      <Camara zoomDesde={1.0} zoomHasta={1.18} panDesde={[0, 0]} panHasta={[-40, -30]} origen="50% 60%">
        <Aula tono="tenso" emociones={["enojado", "triste", "enojado", "miedo"]} pizarra="¿Qué hago con mi enojo?" />
      </Camara>
      {/* degradado para leer el texto */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(22,33,62,0) 35%, rgba(22,33,62,0.75) 62%, rgba(22,33,62,0.95) 100%)",
          opacity: interpolate(frame, [0.6 * fps, 1.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 120px 110px" }}>
        <PalabrasPorBloque
          texto="Un niño que no sabe qué hacer con su enojo…"
          desde={Math.round(1 * fps)}
          intervalo={4}
          tamano={84}
          color={C.blanco}
          alinear="left"
          resaltar={{ enojo: C.enojo }}
        />
        <div style={{ display: "flex", gap: 30, marginTop: 34 }}>
          <Aparecer desde={3.6 * fps} tipo="abajo">
            <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 64, color: C.blanco, backgroundColor: C.enojo, borderRadius: 20, padding: "4px 30px" }}>grita</div>
          </Aparecer>
          <Aparecer desde={4.2 * fps} tipo="abajo">
            <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 64, color: C.blanco, backgroundColor: C.naranja, borderRadius: 20, padding: "4px 30px" }}>empuja</div>
          </Aparecer>
          <Aparecer desde={4.8 * fps} tipo="abajo">
            <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 64, color: C.blanco, backgroundColor: C.tristeza, borderRadius: 20, padding: "4px 30px" }}>o se queda callado en un rincón</div>
          </Aparecer>
        </div>
      </AbsoluteFill>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="pop" en={3.6 * fps} volumen={0.5} />
      <Sfx nombre="pop" en={4.2 * fps} volumen={0.5} />
      <Sfx nombre="pop" en={4.8 * fps} volumen={0.5} />
    </AbsoluteFill>
  );
};
