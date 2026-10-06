import type React from "react";
import type { Emocion } from "./Nino";
import { C } from "../theme";

export const COLOR_EMOCION: Record<Emocion, string> = {
  feliz: C.alegria,
  triste: C.tristeza,
  enojado: C.enojo,
  miedo: C.miedo,
  sorprendido: C.naranja,
  calmado: C.calma,
};

export const NOMBRE_EMOCION: Record<Emocion, string> = {
  feliz: "Alegría",
  triste: "Tristeza",
  enojado: "Enojo",
  miedo: "Miedo",
  sorprendido: "Sorpresa",
  calmado: "Calma",
};

/** Carita de emoción (como las tarjetas usadas en el taller). */
export const Carita: React.FC<{ emocion: Emocion; tam?: number; style?: React.CSSProperties }> = ({
  emocion,
  tam = 200,
  style,
}) => {
  const ojo = (cx: number) =>
    emocion === "calmado" ? (
      <path d={`M${cx - 10} 82 Q${cx} 90 ${cx + 10} 82`} stroke={C.tinta} strokeWidth={6} fill="none" strokeLinecap="round" />
    ) : (
      <ellipse cx={cx} cy={82} rx={9} ry={emocion === "sorprendido" || emocion === "miedo" ? 14 : 11} fill={C.tinta} />
    );
  const boca: Record<Emocion, React.ReactNode> = {
    feliz: <path d="M64 120 Q100 160 136 120 Z" fill={C.tinta} />,
    triste: <path d="M70 140 Q100 116 130 140" stroke={C.tinta} strokeWidth={8} fill="none" strokeLinecap="round" />,
    enojado: <path d="M72 138 L128 138" stroke={C.tinta} strokeWidth={8} strokeLinecap="round" />,
    miedo: <path d="M70 140 Q85 126 100 140 Q115 154 130 140" stroke={C.tinta} strokeWidth={7} fill="none" strokeLinecap="round" />,
    sorprendido: <ellipse cx={100} cy={136} rx={14} ry={18} fill={C.tinta} />,
    calmado: <path d="M76 126 Q100 142 124 126" stroke={C.tinta} strokeWidth={7} fill="none" strokeLinecap="round" />,
  };
  return (
    <svg viewBox="0 0 200 200" width={tam} height={tam} style={style}>
      <circle cx={100} cy={100} r={92} fill={COLOR_EMOCION[emocion]} stroke={C.tinta} strokeWidth={6} />
      {emocion === "enojado" && (
        <>
          <path d="M56 58 L84 70" stroke={C.tinta} strokeWidth={7} strokeLinecap="round" />
          <path d="M144 58 L116 70" stroke={C.tinta} strokeWidth={7} strokeLinecap="round" />
        </>
      )}
      {(emocion === "triste" || emocion === "miedo") && (
        <>
          <path d="M58 66 L84 56" stroke={C.tinta} strokeWidth={7} strokeLinecap="round" />
          <path d="M142 66 L116 56" stroke={C.tinta} strokeWidth={7} strokeLinecap="round" />
        </>
      )}
      {ojo(72)}
      {ojo(128)}
      {boca[emocion]}
      <circle cx={52} cy={112} r={11} fill="#fff" opacity={0.3} />
      <circle cx={148} cy={112} r={11} fill="#fff" opacity={0.3} />
    </svg>
  );
};
