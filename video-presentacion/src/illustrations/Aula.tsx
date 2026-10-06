import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT_TITULO, PIELES } from "../theme";
import { type Emocion, Nino } from "./Nino";

type Props = {
  readonly emociones?: Emocion[];
  readonly pizarra?: string;
  /** Escena nocturna/apagada para momentos de problema. */
  readonly tono?: "dia" | "tenso";
};

const Pupitre: React.FC<{ x: number }> = ({ x }) => (
  <div style={{ position: "absolute", left: x, top: 840, width: 300, height: 240 }}>
    <div style={{ position: "absolute", top: 0, width: 300, height: 34, backgroundColor: "#C98B4F", borderRadius: 10, boxShadow: "0 8px 0 #9E6A37" }} />
    <div style={{ position: "absolute", top: 40, left: 26, width: 20, height: 200, backgroundColor: "#5F6B85" }} />
    <div style={{ position: "absolute", top: 40, right: 26, width: 20, height: 200, backgroundColor: "#5F6B85" }} />
  </div>
);

/** B-roll ilustrado: un aula con pizarra, ventana y niños en sus pupitres. */
export const Aula: React.FC<Props> = ({
  emociones = ["feliz", "feliz", "feliz", "feliz"],
  pizarra = "¿Cómo me siento hoy?",
  tono = "dia",
}) => {
  const frame = useCurrentFrame();
  const letras = Math.floor(interpolate(frame, [10, 10 + pizarra.length * 2], [0, pizarra.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const pelos = ["afro", "trenzas", "corto", "colitas"] as const;
  const ropas = [C.tristeza, C.naranja, C.verde, C.miedo];

  return (
    <AbsoluteFill style={{ backgroundColor: tono === "dia" ? "#FDE7C8" : "#CFC6D9", overflow: "hidden" }}>
      {/* zócalo */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 600, height: 70, backgroundColor: tono === "dia" ? "#F3C98B" : "#ABA0BE" }} />
      {/* piso */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 670, bottom: 0, backgroundColor: tono === "dia" ? "#E2A86A" : "#9C8DA8" }} />
      {/* ventana */}
      <div style={{ position: "absolute", left: 110, top: 110, width: 360, height: 360, borderRadius: 24, border: "18px solid #fff", backgroundColor: tono === "dia" ? "#8FD3FF" : "#6C7AA0", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 50,
            width: 110,
            height: 110,
            borderRadius: "50%",
            backgroundColor: C.alegria,
            boxShadow: `0 0 0 ${18 + Math.sin(frame / 10) * 6}px ${C.alegria}55`,
            opacity: tono === "dia" ? 1 : 0.35,
          }}
        />
        <div style={{ position: "absolute", left: -40 + ((frame * 0.8) % 460), top: 200, width: 140, height: 50, borderRadius: 30, backgroundColor: "#fff" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70, backgroundColor: "#5DBB63" }} />
        <div style={{ position: "absolute", left: 152, top: 0, bottom: 0, width: 18, backgroundColor: "#fff" }} />
      </div>
      {/* pizarra */}
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 100,
          width: 1180,
          height: 420,
          backgroundColor: "#2F5D50",
          border: "22px solid #B9824D",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_TITULO,
          fontWeight: 700,
          fontSize: 86,
          color: "rgba(255,255,255,0.92)",
          textAlign: "center",
          padding: 40,
        }}
      >
        {pizarra.slice(0, letras)}
      </div>
      {/* niños y pupitres */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 140 + i * 430, top: 520 }}>
          <Nino
            piel={PIELES[i]}
            ropa={ropas[i]}
            pelo={pelos[i]}
            emocion={emociones[i] ?? "feliz"}
            alto={360}
            fase={i * 23}
          />
        </div>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Pupitre key={`p${i}`} x={110 + i * 430} />
      ))}
    </AbsoluteFill>
  );
};
