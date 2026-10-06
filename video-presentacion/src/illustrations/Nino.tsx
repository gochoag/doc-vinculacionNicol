import type React from "react";
import { useCurrentFrame } from "remotion";
import { C } from "../theme";

export type Emocion = "feliz" | "enojado" | "triste" | "calmado" | "sorprendido" | "miedo";

type Props = {
  readonly piel: string;
  readonly ropa: string;
  readonly pelo?: "afro" | "trenzas" | "corto" | "colitas";
  readonly emocion?: Emocion;
  readonly alto?: number;
  /** Desfase para que no todos se muevan igual. */
  readonly fase?: number;
  readonly brazosArriba?: boolean;
  readonly style?: React.CSSProperties;
};

const PELO = "#1B120C";

const Boca: React.FC<{ emocion: Emocion }> = ({ emocion }) => {
  switch (emocion) {
    case "feliz":
      return <path d="M80 128 Q100 150 120 128 Z" fill="#5B1A1A" stroke="#3A0F0F" strokeWidth={3} strokeLinejoin="round" />;
    case "enojado":
      return <path d="M84 138 Q100 126 116 138" fill="none" stroke="#3A0F0F" strokeWidth={5} strokeLinecap="round" />;
    case "triste":
      return <path d="M86 140 Q100 128 114 140" fill="none" stroke="#3A0F0F" strokeWidth={4} strokeLinecap="round" />;
    case "sorprendido":
    case "miedo":
      return <ellipse cx={100} cy={136} rx={8} ry={11} fill="#5B1A1A" />;
    default:
      return <path d="M86 132 Q100 142 114 132" fill="none" stroke="#3A0F0F" strokeWidth={4} strokeLinecap="round" />;
  }
};

const Cejas: React.FC<{ emocion: Emocion }> = ({ emocion }) => {
  const s = { stroke: PELO, strokeWidth: 5, strokeLinecap: "round" as const, fill: "none" };
  if (emocion === "enojado")
    return (
      <>
        <path d="M68 86 L90 96" {...s} />
        <path d="M132 86 L110 96" {...s} />
      </>
    );
  if (emocion === "triste" || emocion === "miedo")
    return (
      <>
        <path d="M70 94 L90 86" {...s} />
        <path d="M130 94 L110 86" {...s} />
      </>
    );
  if (emocion === "sorprendido")
    return (
      <>
        <path d="M70 84 Q80 76 90 84" {...s} />
        <path d="M110 84 Q120 76 130 84" {...s} />
      </>
    );
  return (
    <>
      <path d="M70 90 Q80 84 90 90" {...s} />
      <path d="M110 90 Q120 84 130 90" {...s} />
    </>
  );
};

/** Niño o niña ilustrado, con emoción, parpadeo y respiración. */
export const Nino: React.FC<Props> = ({
  piel,
  ropa,
  pelo = "corto",
  emocion = "feliz",
  alto = 300,
  fase = 0,
  brazosArriba = false,
  style,
}) => {
  const frame = useCurrentFrame() + fase;
  const parpadeo = frame % 110 < 5 ? 0.15 : 1;
  const respira = Math.sin(frame / 14) * 3;
  const temblor = emocion === "enojado" ? Math.sin(frame * 1.7) * 1.5 : 0;
  const ojosCerrados = emocion === "calmado";

  return (
    <svg viewBox="0 0 200 300" height={alto} style={{ overflow: "visible", ...style }}>
      {/* sombra */}
      <ellipse cx={100} cy={292} rx={62} ry={8} fill="rgba(0,0,0,0.12)" />
      <g transform={`translate(${temblor} ${respira})`}>
        {/* brazos */}
        {brazosArriba ? (
          <>
            <path d="M52 200 Q30 160 34 120" stroke={piel} strokeWidth={18} strokeLinecap="round" fill="none" />
            <path d="M148 200 Q170 160 166 120" stroke={piel} strokeWidth={18} strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <path d="M54 196 Q38 230 48 262" stroke={piel} strokeWidth={18} strokeLinecap="round" fill="none" />
            <path d="M146 196 Q162 230 152 262" stroke={piel} strokeWidth={18} strokeLinecap="round" fill="none" />
          </>
        )}
        {/* cuerpo */}
        <path d="M50 290 Q48 196 100 186 Q152 196 150 290 Z" fill={ropa} />
        <path d="M84 188 Q100 204 116 188" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={5} />
        {/* cuello */}
        <rect x={90} y={160} width={20} height={30} rx={8} fill={piel} />
        {/* pelo detrás */}
        {pelo === "afro" && <circle cx={100} cy={92} r={74} fill={PELO} />}
        {pelo === "trenzas" && (
          <>
            <path d="M42 100 Q30 170 46 200" stroke={PELO} strokeWidth={16} strokeLinecap="round" fill="none" />
            <path d="M158 100 Q170 170 154 200" stroke={PELO} strokeWidth={16} strokeLinecap="round" fill="none" />
            <circle cx={46} cy={204} r={8} fill={C.rosa} />
            <circle cx={154} cy={204} r={8} fill={C.rosa} />
          </>
        )}
        {pelo === "colitas" && (
          <>
            <circle cx={38} cy={66} r={26} fill={PELO} />
            <circle cx={162} cy={66} r={26} fill={PELO} />
          </>
        )}
        {/* cabeza */}
        <circle cx={100} cy={108} r={60} fill={piel} />
        <ellipse cx={42} cy={112} rx={10} ry={14} fill={piel} />
        <ellipse cx={158} cy={112} rx={10} ry={14} fill={piel} />
        {/* pelo delante */}
        {pelo === "corto" && <path d="M42 100 Q46 40 100 42 Q154 40 158 100 Q140 66 100 70 Q60 66 42 100 Z" fill={PELO} />}
        {pelo === "afro" && <path d="M44 96 Q52 50 100 48 Q148 50 156 96 Q134 72 100 74 Q66 72 44 96 Z" fill={PELO} />}
        {(pelo === "trenzas" || pelo === "colitas") && (
          <path d="M40 104 Q42 44 100 44 Q158 44 160 104 Q150 70 112 66 Q100 80 88 66 Q50 70 40 104 Z" fill={PELO} />
        )}
        {/* mejillas */}
        <circle cx={70} cy={126} r={9} fill={C.rosa} opacity={0.45} />
        <circle cx={130} cy={126} r={9} fill={C.rosa} opacity={0.45} />
        {/* ojos */}
        {ojosCerrados ? (
          <>
            <path d="M72 108 Q80 114 88 108" stroke="#1B120C" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M112 108 Q120 114 128 108" stroke="#1B120C" strokeWidth={4} fill="none" strokeLinecap="round" />
          </>
        ) : (
          <g transform={`translate(0 ${108 * (1 - parpadeo)}) scale(1 ${parpadeo})`}>
            <ellipse cx={80} cy={108} rx={8} ry={emocion === "sorprendido" || emocion === "miedo" ? 11 : 9} fill="#1B120C" />
            <ellipse cx={120} cy={108} rx={8} ry={emocion === "sorprendido" || emocion === "miedo" ? 11 : 9} fill="#1B120C" />
            <circle cx={83} cy={104} r={3} fill="#fff" />
            <circle cx={123} cy={104} r={3} fill="#fff" />
          </g>
        )}
        <Cejas emocion={emocion} />
        <Boca emocion={emocion} />
        {emocion === "triste" && (
          <ellipse cx={76} cy={124 + ((frame * 1.2) % 30)} rx={4} ry={6} fill={C.tristeza} opacity={0.8} />
        )}
        {emocion === "enojado" && (
          <g opacity={0.9}>
            <path d="M150 50 l10 -14 M160 58 l16 -6 M146 40 l2 -16" stroke={C.enojo} strokeWidth={5} strokeLinecap="round" />
          </g>
        )}
      </g>
    </svg>
  );
};
