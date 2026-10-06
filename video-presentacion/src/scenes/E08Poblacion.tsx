import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { Camara } from "../components/Camara";
import { Etiqueta, Sfx } from "../components/Etiqueta";
import { Fondo } from "../components/Fondo";
import { C, FONT_TEXTO, FONT_TITULO } from "../theme";

/** Mapa estilizado de la costa con un pin que cae sobre San Lorenzo. */
const MapaPin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const caida = Math.round(1 * fps);
  return (
    <div style={{ position: "relative", width: 640, height: 640 }}>
      <svg viewBox="0 0 640 640" width={640} height={640}>
        <rect x={0} y={0} width={640} height={640} rx={60} fill="#8FD3FF" />
        <path
          d="M260 0 L640 0 L640 640 L330 640 Q300 560 250 520 Q200 470 230 400 Q250 330 200 280 Q150 230 190 160 Q230 100 210 40 Z"
          fill="#7CCB7F"
          stroke="#4E9E52"
          strokeWidth={8}
        />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${40 + ((frame * 1.5 + i * 60) % 160)} ${200 + i * 140} q20 -14 40 0 t40 0`}
            stroke="#fff"
            strokeWidth={6}
            fill="none"
            opacity={0.7}
          />
        ))}
        <text x={300} y={600} fontFamily={FONT_TITULO} fontWeight={800} fontSize={40} fill="#2E6B31">
          ESMERALDAS
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 290,
          top: 150,
          translate: interpolate(frame, [0.3 * fps, caida], ["0px -600px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.5, 0, 0.75, 0),
          }),
          scale: interpolate(frame, [caida, caida + 4, caida + 10], [1, 0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <svg viewBox="0 0 100 140" width={110}>
          <path d="M50 136 Q10 80 10 50 A40 40 0 1 1 90 50 Q90 80 50 136 Z" fill={C.enojo} stroke={C.tinta} strokeWidth={5} />
          <circle cx={50} cy={50} r={16} fill={C.blanco} />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 270,
          top: 290,
          width: 150,
          height: 40,
          borderRadius: "50%",
          border: `5px solid ${C.enojo}`,
          opacity: interpolate(frame, [caida, caida + 20], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          scale: interpolate(frame, [caida, caida + 20], [0.3, 1.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />
      <Aparecer desde={caida + 6} tipo="pop" style={{ position: "absolute", left: 330, top: 340 }}>
        <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 44, color: C.blanco, backgroundColor: C.tinta, borderRadius: 16, padding: "4px 22px" }}>
          San Lorenzo
        </div>
      </Aparecer>
    </div>
  );
};

const Dato: React.FC<{ icono: string; titulo: string; texto: string; color: string }> = ({ icono, titulo, texto, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
    <div style={{ width: 100, height: 100, borderRadius: 28, backgroundColor: color, fontSize: 56, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {icono}
    </div>
    <div>
      <div style={{ fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 30, color: C.tintaSuave, letterSpacing: 3 }}>{titulo}</div>
      <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 52, color: C.tinta, lineHeight: 1.05 }}>{texto}</div>
    </div>
  </div>
);

/** Población beneficiaria e institución receptora. */
export const E08Poblacion: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Fondo semilla="poblacion" manchas={[C.calma, C.tristeza, C.alegria]} />
      <Etiqueta numero="04" texto="¿Dónde y con quién?" color={C.verde} />
      <Camara zoomDesde={1.05} zoomHasta={1} panDesde={[40, 0]} panHasta={[0, 0]}>
        <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "110px 120px 0", gap: 90 }}>
          <MapaPin />
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            <Aparecer desde={1.6 * fps} tipo="derecha">
              <Dato icono="🏫" titulo="INSTITUCIÓN RECEPTORA" texto="U.E. Néstor Barahona Grueso" color={C.alegria} />
            </Aparecer>
            <Aparecer desde={2.3 * fps} tipo="derecha">
              <Dato icono="👧🏾" titulo="BENEFICIARIOS" texto="Niños y niñas de 4.º año de Básica" color={C.rosa} />
            </Aparecer>
            <Aparecer desde={3 * fps} tipo="derecha">
              <Dato icono="🎓" titulo="AUTORA · QUINTO SEMESTRE" texto="Nickol Alejandra Castillo Caicedo" color={C.calma} />
            </Aparecer>
          </div>
        </AbsoluteFill>
      </Camara>
      <Sfx nombre="whoosh" en={0} volumen={0.5} />
      <Sfx nombre="impacto" en={1 * fps - 1} volumen={0.35} />
      <Sfx nombre="pop" en={1.6 * fps} volumen={0.45} />
      <Sfx nombre="pop" en={2.3 * fps} volumen={0.45} />
      <Sfx nombre="pop" en={3 * fps} volumen={0.45} />
    </AbsoluteFill>
  );
};
