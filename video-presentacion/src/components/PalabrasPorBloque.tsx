import type React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_TITULO } from "../theme";

type Props = {
  readonly texto: string;
  /** Frame (dentro de la escena) en el que aparece la primera palabra. */
  readonly desde?: number;
  /** Frames entre palabra y palabra. */
  readonly intervalo?: number;
  readonly tamano?: number;
  readonly color?: string;
  /** Palabras (sin tildes de puntuación) que se pintan como bloque de color. */
  readonly resaltar?: Record<string, string>;
  readonly alinear?: "left" | "center";
  readonly peso?: number;
  readonly fuente?: string;
  readonly anchoMax?: number;
  readonly style?: React.CSSProperties;
};

const limpiar = (p: string) => p.replace(/[.,;:¿?¡!“”"()]/g, "").toLowerCase();

/**
 * Muestra un texto palabra por palabra: cada palabra entra como un bloque
 * que sube, crece y se asienta con un pequeño rebote.
 */
export const PalabrasPorBloque: React.FC<Props> = ({
  texto,
  desde = 0,
  intervalo = 4,
  tamano = 84,
  color = C.tinta,
  resaltar = {},
  alinear = "center",
  peso = 800,
  fuente = FONT_TITULO,
  anchoMax = 1600,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palabras = texto.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: alinear === "center" ? "center" : "flex-start",
        columnGap: tamano * 0.28,
        rowGap: tamano * 0.12,
        maxWidth: anchoMax,
        fontFamily: fuente,
        fontWeight: peso,
        fontSize: tamano,
        lineHeight: 1.12,
        color,
        ...style,
      }}
    >
      {palabras.map((p, i) => {
        const inicio = desde + i * intervalo;
        const fondo = resaltar[limpiar(p)];
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: interpolate(frame, [inicio, inicio + 0.2 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(frame, [inicio, inicio + 0.45 * fps], ["0px 50px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              }),
              scale: interpolate(frame, [inicio, inicio + 0.45 * fps], [0.6, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              }),
              rotate: interpolate(frame, [inicio, inicio + 0.45 * fps], [i % 2 ? "6deg" : "-6deg", "0deg"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              ...(fondo
                ? {
                    backgroundColor: fondo,
                    color: C.blanco,
                    padding: `0 ${tamano * 0.22}px`,
                    borderRadius: tamano * 0.22,
                    boxShadow: `0 ${tamano * 0.08}px 0 rgba(0,0,0,0.15)`,
                  }
                : {}),
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};

/** Número de frames que tarda en aparecer un texto completo. */
export const duracionTexto = (texto: string, intervalo = 4) =>
  texto.split(" ").length * intervalo;
