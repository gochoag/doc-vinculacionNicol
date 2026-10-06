import "./theme";
import { Composition, Folder } from "remotion";
import { PresentacionVinculacion } from "./PresentacionVinculacion";
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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 180+210+240+240+210+210+240+210+240+105+6×180+210+240+210+180 = 4005
          menos 19 transiciones (3×20 + 2×24 + 14×18 = 360) = 3645 frames */}
      <Composition
        id="PresentacionVinculacion"
        component={PresentacionVinculacion}
        durationInFrames={3645}
        fps={30}
        width={1920}
        height={1080}
      />
      <Folder name="Escenas">
        <Composition id="E01-Intro" component={E01Intro} durationInFrames={180} fps={30} width={1920} height={1080} />
        <Composition id="E02-Titulo" component={E02Titulo} durationInFrames={210} fps={30} width={1920} height={1080} />
        <Composition id="E03-Gancho" component={E03Gancho} durationInFrames={240} fps={30} width={1920} height={1080} />
        <Composition id="E04-Problema" component={E04Problema} durationInFrames={240} fps={30} width={1920} height={1080} />
        <Composition id="E05-Justificacion" component={E05Justificacion} durationInFrames={210} fps={30} width={1920} height={1080} />
        <Composition id="E06-ObjetivoGeneral" component={E06ObjetivoGeneral} durationInFrames={210} fps={30} width={1920} height={1080} />
        <Composition id="E07-ObjetivosEspecificos" component={E07ObjetivosEspecificos} durationInFrames={240} fps={30} width={1920} height={1080} />
        <Composition id="E08-Poblacion" component={E08Poblacion} durationInFrames={210} fps={30} width={1920} height={1080} />
        <Composition id="E09-Metodologia" component={E09Metodologia} durationInFrames={240} fps={30} width={1920} height={1080} />
        <Composition id="E10-Talleres" component={E10Talleres} durationInFrames={105} fps={30} width={1920} height={1080} />
        <Composition
          id="Taller-1"
          component={EscenaTaller}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            numero: 1,
            fase: "Fase 1 · Diagnóstico",
            titulo: "Conociendo nuestras emociones",
            descripcion: "Con tarjetas de caritas, los niños expresan cómo se sienten en el recreo, los juegos y las tareas.",
            color: "#FFC93C",
            ilustracion: "caritas",
            lado: "derecha",
          }}
        />
        <Composition
          id="Taller-2"
          component={EscenaTaller}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            numero: 2,
            fase: "Fase 1 · Diagnóstico",
            titulo: "El semáforo de las emociones",
            descripcion: "Levantan paletas verde, amarilla o roja según cómo se sentirían ante burlas o juegos perdidos.",
            color: "#FF5A5F",
            ilustracion: "semaforo",
            lado: "izquierda",
          }}
        />
        <Composition
          id="Taller-3"
          component={EscenaTaller}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            numero: 3,
            fase: "Fase 2 · Manejo de emociones",
            titulo: "Respiro, pienso y actúo",
            descripcion: "Miden su enojo en un termómetro y practican la respiración del globo y la técnica de la tortuga.",
            color: "#2EC4B6",
            ilustracion: "respiro",
            lado: "derecha",
          }}
        />
        <Composition
          id="Taller-4"
          component={EscenaTaller}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            numero: 4,
            fase: "Fase 3 · Resolución de conflictos",
            titulo: "La mesa de la paz",
            descripcion: "En parejas representan conflictos del aula y los resuelven: se calman, se escuchan y llegan a un acuerdo.",
            color: "#4D96FF",
            ilustracion: "mesa",
            lado: "izquierda",
          }}
        />
        <Composition
          id="Taller-5"
          component={EscenaTaller}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            numero: 5,
            fase: "Fase 4 · Convivencia",
            titulo: "Juntos lo logramos",
            descripcion: "Juegos en equipo donde solo ganan si todos colaboran; luego conversan sobre cómo se ayudaron.",
            color: "#6BCB77",
            ilustracion: "juntos",
            lado: "derecha",
          }}
        />
        <Composition
          id="Taller-6"
          component={EscenaTaller}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            numero: 6,
            fase: "Fase 5 · Cierre",
            titulo: "Nuestro pacto de convivencia",
            descripcion: "Repasan lo aprendido, proponen acuerdos para el aula y los firman con su huella.",
            color: "#9B5DE5",
            ilustracion: "pacto",
            lado: "izquierda",
          }}
        />
        <Composition id="E11-Cronograma" component={E11Cronograma} durationInFrames={210} fps={30} width={1920} height={1080} />
        <Composition id="E12-Logros" component={E12Logros} durationInFrames={240} fps={30} width={1920} height={1080} />
        <Composition id="E13-Conclusion" component={E13Conclusion} durationInFrames={210} fps={30} width={1920} height={1080} />
        <Composition id="E14-Cierre" component={E14Cierre} durationInFrames={180} fps={30} width={1920} height={1080} />
      </Folder>
    </>
  );
};
