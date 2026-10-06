import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { Carita } from "../illustrations/Carita";
import { C, FONT_TEXTO } from "../theme";

/** Título del proyecto, palabra por palabra. */
export const E02Titulo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo semilla="titulo" manchas={[C.alegria, C.rosa, C.calma]} />
      <Camara zoomDesde={1.06} zoomHasta={1} golpes={[Math.round(1.6 * fps)]}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 40, padding: "0 140px" }}>
          <Aparecer desde={2}>
            <div style={{ fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 40, color: C.tintaSuave, letterSpacing: 6 }}>TEMA DEL PROYECTO</div>
          </Aparecer>
          <PalabrasPorBloque
            texto="Talleres de manejo de emociones y resolución pacífica de conflictos"
            desde={8}
            intervalo={4}
            tamano={108}
            resaltar={{ emociones: C.naranja, pacífica: C.calma, conflictos: C.enojo }}
          />
          <div
            style={{
              fontFamily: FONT_TEXTO,
              fontWeight: 700,
              fontSize: 46,
              color: C.tintaSuave,
              textAlign: "center",
              opacity: interpolate(frame, [2.4 * fps, 3 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              translate: interpolate(frame, [2.4 * fps, 3 * fps], ["0px 30px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            con los estudiantes de Cuarto Año de Básica
            <br />
            Unidad Educativa Néstor Barahona Grueso
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
            <Aparecer desde={3.2 * fps} tipo="giro" flotar>
              <Carita emocion="feliz" tam={110} />
            </Aparecer>
            <Aparecer desde={3.4 * fps} tipo="giro" flotar>
              <Carita emocion="triste" tam={110} />
            </Aparecer>
            <Aparecer desde={3.6 * fps} tipo="giro" flotar>
              <Carita emocion="enojado" tam={110} />
            </Aparecer>
            <Aparecer desde={3.8 * fps} tipo="giro" flotar>
              <Carita emocion="miedo" tam={110} />
            </Aparecer>
            <Aparecer desde={4 * fps} tipo="giro" flotar>
              <Carita emocion="calmado" tam={110} />
            </Aparecer>
          </div>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="pop" en={8 + 5 * 4} volumen={0.45} />
      <Sfx nombre="pop" en={8 + 8 * 4} volumen={0.45} />
      <Sfx nombre="pop" en={8 + 10 * 4} volumen={0.45} />
      <Sfx nombre="tick" en={3.2 * fps} volumen={0.4} />
      <Sfx nombre="tick" en={3.4 * fps} volumen={0.4} />
      <Sfx nombre="tick" en={3.6 * fps} volumen={0.4} />
      <Sfx nombre="tick" en={3.8 * fps} volumen={0.4} />
      <Sfx nombre="tick" en={4 * fps} volumen={0.4} />
    </AbsoluteFill>
  );
};
