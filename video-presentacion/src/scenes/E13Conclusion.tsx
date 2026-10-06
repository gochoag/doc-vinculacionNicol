import type React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { PalabrasPorBloque } from "../components/PalabrasPorBloque";
import { Nino } from "../illustrations/Nino";
import { C, PIELES } from "../theme";

/** Conclusión principal del proyecto. */
export const E13Conclusion: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo base={C.noche} semilla="conclusion" manchas={[C.calma, C.miedo, C.tristeza]} />
      <Etiqueta numero="09" texto="Conclusión" color={C.rosa} />
      <Camara zoomDesde={1} zoomHasta={1.12} origen="50% 35%" golpes={[Math.round(3.2 * fps)]}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 220 }}>
          <PalabrasPorBloque
            texto="Los niños aprendieron a detenerse antes de actuar y a buscar el diálogo como primera opción"
            desde={8}
            intervalo={4}
            tamano={90}
            color={C.blanco}
            anchoMax={1600}
            resaltar={{ detenerse: C.calma, diálogo: C.naranja }}
          />
        </AbsoluteFill>
        <AbsoluteFill style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 30, paddingBottom: 70 }}>
          <Aparecer desde={3 * fps} tipo="abajo">
            <Nino piel={PIELES[0]} ropa={C.alegria} pelo="afro" emocion="feliz" alto={330} brazosArriba />
          </Aparecer>
          <Aparecer desde={3.15 * fps} tipo="abajo">
            <Nino piel={PIELES[3]} ropa={C.calma} pelo="trenzas" emocion="feliz" alto={330} fase={20} />
          </Aparecer>
          <Aparecer desde={3.3 * fps} tipo="abajo">
            <Nino piel={PIELES[1]} ropa={C.enojo} pelo="corto" emocion="feliz" alto={330} fase={40} brazosArriba />
          </Aparecer>
          <Aparecer desde={3.45 * fps} tipo="abajo">
            <Nino piel={PIELES[5]} ropa={C.miedo} pelo="colitas" emocion="calmado" alto={330} fase={60} />
          </Aparecer>
          <Aparecer desde={3.6 * fps} tipo="abajo">
            <Nino piel={PIELES[2]} ropa={C.verde} pelo="afro" emocion="feliz" alto={330} fase={80} brazosArriba />
          </Aparecer>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="impacto" en={3 * fps} volumen={0.4} />
    </AbsoluteFill>
  );
};
