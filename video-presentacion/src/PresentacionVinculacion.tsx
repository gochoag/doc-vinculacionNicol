import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { fade } from "@remotion/transitions/fade";
import { flip } from "@remotion/transitions/flip";
import { iris } from "@remotion/transitions/iris";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import type React from "react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { E01Intro } from "./scenes/E01Intro";
import { E02Titulo } from "./scenes/E02Titulo";
import { E03Gancho } from "./scenes/E03Gancho";
import { E04Problema } from "./scenes/E04Problema";
import { E05Justificacion } from "./scenes/E05Justificacion";
import { E06ObjetivoGeneral } from "./scenes/E06ObjetivoGeneral";
import { E07ObjetivosEspecificos } from "./scenes/E07ObjetivosEspecificos";
import { E08Poblacion } from "./scenes/E08Poblacion";
import { E09Metodologia } from "./scenes/E09Metodologia";
import { E10Talleres } from "./scenes/E10Talleres";
import { E11Cronograma } from "./scenes/E11Cronograma";
import { E12Logros } from "./scenes/E12Logros";
import { E13Conclusion } from "./scenes/E13Conclusion";
import { E14Cierre } from "./scenes/E14Cierre";
import { EscenaTaller } from "./scenes/EscenaTaller";
import { C } from "./theme";

/** Video presentativo del proyecto de vinculación (≈ 2 minutos). */
export const PresentacionVinculacion: React.FC = () => {
  const { fps, width, height, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: C.noche }}>
      <TransitionSeries name="Escenas">
        <TransitionSeries.Sequence name="Intro" durationInFrames={180} premountFor={fps}>
          <E01Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={iris({ width, height })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence name="Título" durationInFrames={210} premountFor={fps}>
          <E02Titulo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Gancho (b-roll aula)" durationInFrames={240} premountFor={fps}>
          <E03Gancho />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Problema" durationInFrames={240} premountFor={fps}>
          <E04Problema />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Justificación" durationInFrames={210} premountFor={fps}>
          <E05Justificacion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={clockWipe({ width, height })} timing={linearTiming({ durationInFrames: 24 })} />
        <TransitionSeries.Sequence name="Objetivo general" durationInFrames={210} premountFor={fps}>
          <E06ObjetivoGeneral />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Objetivos específicos" durationInFrames={240} premountFor={fps}>
          <E07ObjetivosEspecificos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Población" durationInFrames={210} premountFor={fps}>
          <E08Poblacion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-top-left" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Metodología" durationInFrames={240} premountFor={fps}>
          <E09Metodologia />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={iris({ width, height })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence name="Talleres (cifras)" durationInFrames={105} premountFor={fps}>
          <E10Talleres />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Taller 1" durationInFrames={180} premountFor={fps}>
          <EscenaTaller
            numero={1}
            fase="Fase 1 · Diagnóstico"
            titulo="Conociendo nuestras emociones"
            descripcion="Con tarjetas de caritas, los niños expresan cómo se sienten en el recreo, los juegos y las tareas."
            color={C.alegria}
            ilustracion="caritas"
            lado="derecha"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Taller 2" durationInFrames={180} premountFor={fps}>
          <EscenaTaller
            numero={2}
            fase="Fase 1 · Diagnóstico"
            titulo="El semáforo de las emociones"
            descripcion="Levantan paletas verde, amarilla o roja según cómo se sentirían ante burlas o juegos perdidos."
            color={C.enojo}
            ilustracion="semaforo"
            lado="izquierda"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Taller 3" durationInFrames={180} premountFor={fps}>
          <EscenaTaller
            numero={3}
            fase="Fase 2 · Manejo de emociones"
            titulo="Respiro, pienso y actúo"
            descripcion="Miden su enojo en un termómetro y practican la respiración del globo y la técnica de la tortuga."
            color={C.calma}
            ilustracion="respiro"
            lado="derecha"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={flip({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Taller 4" durationInFrames={180} premountFor={fps}>
          <EscenaTaller
            numero={4}
            fase="Fase 3 · Resolución de conflictos"
            titulo="La mesa de la paz"
            descripcion="En parejas representan conflictos del aula y los resuelven: se calman, se escuchan y llegan a un acuerdo."
            color={C.tristeza}
            ilustracion="mesa"
            lado="izquierda"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Taller 5" durationInFrames={180} premountFor={fps}>
          <EscenaTaller
            numero={5}
            fase="Fase 4 · Convivencia"
            titulo="Juntos lo logramos"
            descripcion="Juegos en equipo donde solo ganan si todos colaboran; luego conversan sobre cómo se ayudaron."
            color={C.verde}
            ilustracion="juntos"
            lado="derecha"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={clockWipe({ width, height })} timing={linearTiming({ durationInFrames: 24 })} />
        <TransitionSeries.Sequence name="Taller 6" durationInFrames={180} premountFor={fps}>
          <EscenaTaller
            numero={6}
            fase="Fase 5 · Cierre"
            titulo="Nuestro pacto de convivencia"
            descripcion="Repasan lo aprendido, proponen acuerdos para el aula y los firman con su huella."
            color={C.miedo}
            ilustracion="pacto"
            lado="izquierda"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Cronograma" durationInFrames={210} premountFor={fps}>
          <E11Cronograma />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Logros (b-roll aula)" durationInFrames={240} premountFor={fps}>
          <E12Logros />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={iris({ width, height })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence name="Conclusión" durationInFrames={210} premountFor={fps}>
          <E13Conclusion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-top" })} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="Cierre" durationInFrames={180} premountFor={fps}>
          <E14Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio
        name="Música de fondo"
        src={staticFile("audio/musica-fondo.mp3")}
        premountFor={fps}
        volume={(f) =>
          interpolate(f, [0, fps, durationInFrames - 3 * fps, durationInFrames], [0, 0.32, 0.32, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </AbsoluteFill>
  );
};
