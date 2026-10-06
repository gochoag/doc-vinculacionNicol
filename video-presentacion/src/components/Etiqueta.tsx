import { Audio } from "@remotion/media";
import type React from "react";
import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_TITULO } from "../theme";

/** Píldora de capítulo en la esquina superior izquierda: "02 · El problema". */
export const Etiqueta: React.FC<{ numero: string; texto: string; color?: string }> = ({
  numero,
  texto,
  color = C.tinta,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 80,
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontFamily: FONT_TITULO,
        fontWeight: 800,
        fontSize: 40,
        color: C.blanco,
        backgroundColor: color,
        borderRadius: 50,
        padding: "8px 30px 4px 10px",
        translate: interpolate(frame, [0, 0.6 * fps], ["-500px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        zIndex: 50,
      }}
    >
      <span
        style={{
          backgroundColor: C.blanco,
          color,
          borderRadius: 40,
          padding: "0 18px",
          fontSize: 36,
        }}
      >
        {numero}
      </span>
      {texto}
    </div>
  );
};

type NombreSfx = "whoosh" | "pop" | "tick" | "ding" | "riser" | "impacto";

/** Efecto de sonido colocado en un frame concreto de la escena. */
export const Sfx: React.FC<{ nombre: NombreSfx; en: number; volumen?: number }> = ({ nombre, en, volumen = 0.6 }) => {
  const { fps } = useVideoConfig();
  return (
    <Audio
      name={`SFX ${nombre}`}
      src={staticFile(`audio/${nombre}.wav`)}
      from={Math.round(en)}
      premountFor={fps}
      volume={volumen}
    />
  );
};
