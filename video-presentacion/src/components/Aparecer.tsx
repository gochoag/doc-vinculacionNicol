import type React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Tipo = "pop" | "izquierda" | "derecha" | "arriba" | "abajo" | "giro";

type Props = {
  readonly children: React.ReactNode;
  readonly desde?: number;
  readonly tipo?: Tipo;
  readonly duracion?: number;
  readonly style?: React.CSSProperties;
  /** Flotación suave una vez que aparece. */
  readonly flotar?: boolean;
};

const desplazamientos: Record<Tipo, string> = {
  pop: "0px 0px",
  izquierda: "-260px 0px",
  derecha: "260px 0px",
  arriba: "0px -220px",
  abajo: "0px 220px",
  giro: "0px 80px",
};

/** Entrada animada genérica para tarjetas, íconos e ilustraciones. */
export const Aparecer: React.FC<Props> = ({
  children,
  desde = 0,
  tipo = "pop",
  duracion,
  style,
  flotar = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const d = duracion ?? 0.6 * fps;
  const flota = flotar ? Math.sin((frame - desde) / 18) * 8 : 0;

  return (
    <div
      style={{
        opacity: interpolate(frame, [desde, desde + 0.25 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [desde, desde + d], [tipo === "pop" || tipo === "giro" ? 0.3 : 0.9, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        }),
        translate: interpolate(frame, [desde, desde + d], [desplazamientos[tipo], `0px ${flota}px`], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        rotate: interpolate(frame, [desde, desde + d], [tipo === "giro" ? "-25deg" : "0deg", "0deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
