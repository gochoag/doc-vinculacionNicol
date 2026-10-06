import type React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparecer } from "../components/Aparecer";
import { C, FONT_TEXTO, FONT_TITULO, PIELES } from "../theme";
import { Carita, NOMBRE_EMOCION } from "./Carita";
import { type Emocion, Nino } from "./Nino";

const ANCHO = 860;
const ALTO = 820;

const Caja: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "relative", width: ANCHO, height: ALTO }}>{children}</div>
);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* 1. Conociendo nuestras emociones: tarjetas de caritas en abanico */
export const IlusCaritas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const emociones: Emocion[] = ["feliz", "triste", "enojado", "miedo", "calmado"];
  const elegida = Math.floor(interpolate(frame, [1.6 * fps, 4.6 * fps], [0, 4.99], clamp));

  return (
    <Caja>
      {emociones.map((e, i) => {
        const angulo = (i - 2) * 14;
        const activa = frame > 1.6 * fps && i === elegida;
        return (
          <div
            key={e}
            style={{
              position: "absolute",
              left: ANCHO / 2 - 130,
              top: 160,
              width: 260,
              height: 360,
              transformOrigin: "50% 160%",
              rotate: `${interpolate(frame, [i * 5, i * 5 + 0.7 * fps], [0, angulo], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) })}deg`,
              translate: `0px ${activa ? -60 : 0}px`,
              opacity: interpolate(frame, [i * 5, i * 5 + 8], [0, 1], clamp),
              backgroundColor: C.blanco,
              borderRadius: 28,
              boxShadow: activa ? `0 30px 50px rgba(0,0,0,0.25), 0 0 0 8px ${C.alegria}` : "0 16px 30px rgba(0,0,0,0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              zIndex: activa ? 10 : i,
            }}
          >
            <Carita emocion={e} tam={180} />
            <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 44, color: C.tinta }}>{NOMBRE_EMOCION[e]}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: ANCHO / 2 - 95, top: 560 }}>
        <Nino piel={PIELES[0]} ropa={C.tristeza} pelo="afro" emocion="feliz" alto={260} brazosArriba />
      </div>
    </Caja>
  );
};

/* 2. El semáforo de las emociones: paletas verde, amarilla y roja */
export const IlusSemaforo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const paletas = [
    { color: C.verde, texto: "Tranquilo", emocion: "feliz" as Emocion },
    { color: C.alegria, texto: "Cuidado", emocion: "sorprendido" as Emocion },
    { color: C.enojo, texto: "¡Alto!", emocion: "enojado" as Emocion },
  ];
  const luz = Math.floor((frame / (1.2 * fps)) % 3);

  return (
    <Caja>
      {/* semáforo */}
      <div style={{ position: "absolute", left: ANCHO / 2 - 80, top: 20, width: 160, height: 400, backgroundColor: C.tinta, borderRadius: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", padding: "16px 0" }}>
        {[C.enojo, C.alegria, C.verde].map((c, i) => (
          <div
            key={c}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: c,
              opacity: 2 - i === luz ? 1 : 0.25,
              boxShadow: 2 - i === luz ? `0 0 50px ${c}` : "none",
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", left: ANCHO / 2 - 14, top: 420, width: 28, height: 80, backgroundColor: C.tinta }} />
      {/* niños con paletas */}
      {paletas.map((p, i) => {
        const inicio = 0.4 * fps + i * 0.5 * fps;
        return (
          <div key={p.texto} style={{ position: "absolute", left: 20 + i * 290, top: 470 }}>
            <div
              style={{
                position: "absolute",
                left: 70,
                top: interpolate(frame, [inicio, inicio + 0.5 * fps], [140, -40], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
                width: 130,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <div style={{ width: 130, height: 130, borderRadius: "50%", backgroundColor: p.color, border: `6px solid ${C.tinta}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 28, color: C.tinta, textAlign: "center" }}>
                {p.texto}
              </div>
              <div style={{ width: 12, height: 90, backgroundColor: "#B9824D" }} />
            </div>
            <Nino piel={PIELES[i + 1]} ropa={[C.naranja, C.miedo, C.calma][i]} pelo={(["trenzas", "corto", "colitas"] as const)[i]} emocion={p.emocion} alto={300} fase={i * 17} />
          </div>
        );
      })}
    </Caja>
  );
};

/* 3. Respiro, pienso y actúo: termómetro + globo + tortuga */
export const IlusRespiro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // termómetro sube hasta rojo y luego baja a verde
  const nivel = interpolate(frame, [0, 1.5 * fps, 3.2 * fps, 5 * fps], [0.2, 0.92, 0.92, 0.25], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const colorNivel = nivel > 0.6 ? C.enojo : nivel > 0.4 ? C.naranja : C.verde;
  // globo: respiración (inhala / exhala)
  const ciclo = Math.sin((frame / fps) * Math.PI * 0.8);
  const inflado = 0.75 + 0.3 * (ciclo + 1) / 2;
  // tortuga: se mete en el caparazón a mitad de escena
  const dentro = interpolate(frame, [2 * fps, 2.4 * fps, 3.6 * fps, 4 * fps], [0, 1, 1, 0], clamp);

  return (
    <Caja>
      {/* termómetro */}
      <div style={{ position: "absolute", left: 40, top: 40, width: 120, height: 560 }}>
        <div style={{ position: "absolute", left: 30, top: 0, width: 60, height: 460, borderRadius: 30, backgroundColor: C.blanco, border: `6px solid ${C.tinta}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${nivel * 100}%`, backgroundColor: colorNivel }} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 430, width: 120, height: 120, borderRadius: "50%", backgroundColor: colorNivel, border: `6px solid ${C.tinta}` }} />
        <div style={{ position: "absolute", left: 140, top: 20, fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 40, color: C.enojo }}>😡</div>
        <div style={{ position: "absolute", left: 140, top: 380, fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 40, color: C.verde }}>🙂</div>
      </div>
      {/* globo */}
      <div style={{ position: "absolute", left: 300, top: 40, width: 340, height: 520, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 260,
            height: 310,
            borderRadius: "50% 50% 48% 48%",
            background: `radial-gradient(circle at 35% 30%, #fff8 0%, ${C.calma} 35%, #1E9C90 100%)`,
            scale: inflado,
            transformOrigin: "50% 100%",
          }}
        />
        <div style={{ width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderBottom: `22px solid #1E9C90` }} />
        <svg width={40} height={110}>
          <path d={`M20 0 Q${20 + Math.sin(frame / 8) * 14} 55 20 110`} stroke={C.tinta} strokeWidth={4} fill="none" />
        </svg>
        <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 52, color: C.tinta, marginTop: 4 }}>
          {ciclo > 0 ? "Inhala..." : "Exhala..."}
        </div>
      </div>
      {/* tortuga */}
      <svg viewBox="0 0 300 200" width={320} style={{ position: "absolute", left: 520, top: 560 }}>
        <g transform={`translate(${-40 * dentro} 0)`}>
          <ellipse cx={240 - 40 * dentro} cy={120} rx={36} ry={28} fill="#7DC97F" stroke={C.tinta} strokeWidth={5} />
          <circle cx={252 - 40 * dentro} cy={112} r={5} fill={C.tinta} />
        </g>
        <ellipse cx={90} cy={170} rx={22 * (1 - dentro * 0.7)} ry={14} fill="#7DC97F" />
        <ellipse cx={200} cy={170} rx={22 * (1 - dentro * 0.7)} ry={14} fill="#7DC97F" />
        <path d="M40 160 Q50 50 145 46 Q240 50 250 160 Z" fill="#3E8E41" stroke={C.tinta} strokeWidth={6} />
        <path d="M90 150 L110 90 L180 90 L200 150 M145 46 L145 90" stroke="#2C6B2F" strokeWidth={6} fill="none" />
      </svg>
      <Aparecer desde={2 * fps} tipo="pop" style={{ position: "absolute", left: 40, top: 640, fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 38, color: C.tintaSuave }}>
        Técnica de la tortuga 🐢
      </Aparecer>
    </Caja>
  );
};

/* 4. La mesa de la paz: dos niños pasan del enojo al acuerdo */
export const IlusMesaPaz: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const etapa = frame < 1.4 * fps ? 0 : frame < 3 * fps ? 1 : 2;
  const emocion: Emocion = (["enojado", "calmado", "feliz"] as const)[etapa];
  const pasos = ["1. Me calmo", "2. Escucho", "3. Acordamos"];

  return (
    <Caja>
      <div style={{ position: "absolute", left: 20, top: 260 }}>
        <Nino piel={PIELES[2]} ropa={C.naranja} pelo="corto" emocion={emocion} alto={380} />
      </div>
      <div style={{ position: "absolute", left: 560, top: 260 }}>
        <Nino piel={PIELES[3]} ropa={C.miedo} pelo="trenzas" emocion={emocion} alto={380} fase={30} />
      </div>
      {/* mesa */}
      <div style={{ position: "absolute", left: 120, top: 560, width: 620, height: 50, backgroundColor: "#C98B4F", borderRadius: 14, boxShadow: "0 10px 0 #9E6A37" }} />
      <div style={{ position: "absolute", left: 180, top: 610, width: 26, height: 190, backgroundColor: "#9E6A37" }} />
      <div style={{ position: "absolute", left: 654, top: 610, width: 26, height: 190, backgroundColor: "#9E6A37" }} />
      <div style={{ position: "absolute", left: 330, top: 500, width: 200, height: 60, backgroundColor: C.calma, borderRadius: 12, color: C.blanco, fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
        ☮ Paz
      </div>
      {/* pasos */}
      {pasos.map((p, i) => (
        <Aparecer key={p} desde={i * 1.5 * fps + 6} tipo="arriba" style={{ position: "absolute", left: 40 + i * 270, top: 30 + (i % 2) * 70 }}>
          <div style={{ backgroundColor: i === etapa ? [C.tristeza, C.calma, C.verde][i] : C.blanco, color: i === etapa ? C.blanco : C.tinta, fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 40, padding: "12px 26px", borderRadius: 40, whiteSpace: "nowrap", boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}>
            {p}
          </div>
        </Aparecer>
      ))}
      {etapa === 2 && (
        <div
          style={{
            position: "absolute",
            left: 380,
            top: 220,
            fontSize: 120,
            scale: interpolate(frame, [3 * fps, 3.4 * fps], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
          }}
        >
          🤝
        </div>
      )}
    </Caja>
  );
};

/* 5. Juntos lo logramos: rompecabezas que se arma en equipo */
export const IlusJuntos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const piezas = [
    { color: C.enojo, x: 0, y: 0, dx: -500, dy: -300 },
    { color: C.tristeza, x: 1, y: 0, dx: 500, dy: -300 },
    { color: C.alegria, x: 0, y: 1, dx: -500, dy: 400 },
    { color: C.verde, x: 1, y: 1, dx: 500, dy: 400 },
  ];
  const completo = frame > 2.6 * fps;

  return (
    <Caja>
      <div style={{ position: "absolute", left: ANCHO / 2 - 220, top: 40, width: 440, height: 440 }}>
        {piezas.map((p, i) => {
          const inicio = 0.3 * fps + i * 0.45 * fps;
          return (
            <div
              key={p.color}
              style={{
                position: "absolute",
                left: p.x * 220,
                top: p.y * 220,
                width: 220,
                height: 220,
                backgroundColor: p.color,
                border: `6px solid ${C.tinta}`,
                borderRadius: 18,
                translate: interpolate(frame, [inicio, inicio + 0.6 * fps], [`${p.dx}px ${p.dy}px`, "0px 0px"], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
                rotate: interpolate(frame, [inicio, inicio + 0.6 * fps], [`${(i % 2 ? 1 : -1) * 90}deg`, "0deg"], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
              }}
            >
              <div style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", backgroundColor: p.color, border: `6px solid ${C.tinta}`, left: p.x === 0 ? 180 : -40, top: 70, clipPath: p.x === 0 ? "inset(0 0 0 50%)" : "inset(0 50% 0 0)" }} />
            </div>
          );
        })}
        {completo && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 160,
              scale: interpolate(frame, [2.6 * fps, 3 * fps], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
            }}
          >
            ⭐
          </div>
        )}
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 10 + i * 210, top: 520 }}>
          <Nino piel={PIELES[(i + 2) % 6]} ropa={[C.calma, C.naranja, C.tristeza, C.rosa][i]} pelo={(["colitas", "afro", "corto", "trenzas"] as const)[i]} emocion={completo ? "feliz" : "sorprendido"} alto={290} brazosArriba={completo} fase={i * 11} />
        </div>
      ))}
    </Caja>
  );
};

/* 6. Nuestro pacto de convivencia: acuerdos y huellas */
const Huella: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 100 120" width={88}>
    <ellipse cx={50} cy={78} rx={30} ry={34} fill={color} />
    <ellipse cx={18} cy={50} rx={9} ry={20} fill={color} transform="rotate(-25 18 50)" />
    <ellipse cx={36} cy={28} rx={9} ry={22} fill={color} />
    <ellipse cx={56} cy={22} rx={9} ry={23} fill={color} />
    <ellipse cx={74} cy={30} rx={9} ry={21} fill={color} />
    <ellipse cx={88} cy={56} rx={8} ry={16} fill={color} transform="rotate(30 88 56)" />
  </svg>
);

export const IlusPacto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const acuerdos = ["Hablamos con calma", "Nos escuchamos", "Nos ayudamos", "Respetamos a todos"];
  const colores = [C.enojo, C.tristeza, C.alegria, C.verde, C.miedo, C.naranja];

  return (
    <Caja>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 20,
          width: 740,
          height: 780,
          backgroundColor: "#FFFDF6",
          borderRadius: 20,
          boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
          rotate: "-2deg",
          padding: 50,
        }}
      >
        <div style={{ fontFamily: FONT_TITULO, fontWeight: 800, fontSize: 52, color: C.tinta, textAlign: "center", lineHeight: 1.05 }}>
          Nuestro pacto de convivencia
        </div>
        <div style={{ marginTop: 24 }}>
          {acuerdos.map((a, i) => (
            <Aparecer key={a} desde={0.4 * fps + i * 0.4 * fps} tipo="izquierda">
              <div style={{ fontFamily: FONT_TEXTO, fontWeight: 800, fontSize: 40, color: C.tintaSuave, padding: "8px 0", borderBottom: "3px dashed #E5D5BC" }}>
                ✔ {a}
              </div>
            </Aparecer>
          ))}
        </div>
        <div style={{ position: "absolute", left: 40, right: 40, bottom: 30, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
          {colores.map((c, i) => {
            const inicio = 2.3 * fps + i * 0.25 * fps;
            return (
              <div
                key={c}
                style={{
                  opacity: interpolate(frame, [inicio, inicio + 2], [0, 0.9], clamp),
                  scale: interpolate(frame, [inicio, inicio + 6], [1.8, 1], { ...clamp, easing: Easing.out(Easing.cubic) }),
                  rotate: `${(i - 2.5) * 12}deg`,
                }}
              >
                <Huella color={c} />
              </div>
            );
          })}
        </div>
      </div>
    </Caja>
  );
};
