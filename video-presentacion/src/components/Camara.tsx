import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  readonly children: React.ReactNode;
  /** Zoom lento (Ken Burns) a lo largo de toda la escena. */
  readonly zoomDesde?: number;
  readonly zoomHasta?: number;
  /** Desplazamiento de cámara en px a lo largo de la escena. */
  readonly panDesde?: [number, number];
  readonly panHasta?: [number, number];
  /** Punto hacia el que se hace zoom. */
  readonly origen?: string;
  /** Frames en los que la cámara da un "golpe" de zoom para enfatizar. */
  readonly golpes?: number[];
};

/** Cámara virtual: zoom lento continuo y golpes de zoom de énfasis. */
export const Camara: React.FC<Props> = ({
  children,
  zoomDesde = 1,
  zoomHasta = 1.08,
  panDesde = [0, 0],
  panHasta = [0, 0],
  origen = "50% 50%",
  golpes = [],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const golpe = golpes.reduce((acc, g) => {
    const subida = interpolate(frame, [g, g + 0.12 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const bajada = interpolate(frame, [g + 0.12 * fps, g + 0.7 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
    return acc + 0.06 * (subida - bajada);
  }, 0);

  return (
    <AbsoluteFill
      style={{
        transformOrigin: origen,
        scale: interpolate(frame, [0, durationInFrames], [zoomDesde, zoomHasta], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) + golpe,
        translate: interpolate(
          frame,
          [0, durationInFrames],
          [`${panDesde[0]}px ${panDesde[1]}px`, `${panHasta[0]}px ${panHasta[1]}px`],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) },
        ),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
