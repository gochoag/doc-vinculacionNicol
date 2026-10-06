# Video presentativo · Proyecto de Vinculación

Video de ~2 minutos (1920×1080, 30 fps) hecho con [Remotion](https://www.remotion.dev) a partir de
`NIKOL_PROYECTO_DE_VINCULACION.docx`: *Talleres de manejo de emociones y resolución pacífica de
conflictos con los estudiantes de Cuarto Año de Básica* (U.E. Néstor Barahona Grueso, San Lorenzo).

## Comandos

```console
npm i                 # instalar dependencias
npm run dev           # abrir Remotion Studio (vista previa interactiva)
npx remotion render PresentacionVinculacion out/presentacion-vinculacion.mp4   # exportar MP4
python3 scripts/generar-audio.py   # regenerar música y efectos (requiere numpy y ffmpeg)
```

## Estructura

| Escena | Archivo | Contenido |
| --- | --- | --- |
| Intro | `src/scenes/E01Intro.tsx` | Logo, instituto y carrera |
| Título | `E02Titulo.tsx` | Tema del proyecto, palabra por palabra |
| Gancho | `E03Gancho.tsx` | B-roll del aula: "Un niño que no sabe qué hacer con su enojo…" |
| 01 Problema | `E04Problema.tsx` | Discusiones, conductas agresivas, falta de comunicación |
| 02 Justificación | `E05Justificacion.tsx` | Autonomía, empatía, respeto, diálogo, trabajo en equipo |
| 03 Objetivos | `E06ObjetivoGeneral.tsx`, `E07ObjetivosEspecificos.tsx` | General + 3 específicos |
| 04 Población | `E08Poblacion.tsx` | Mapa de San Lorenzo, institución, beneficiarios, autora |
| 05 Metodología | `E09Metodologia.tsx` | Enfoques educativo, participativo y asistencial |
| 06 Actividades | `E10Talleres.tsx` + `EscenaTaller.tsx` ×6 | Los 6 talleres con ilustraciones animadas |
| 07 Cronograma | `E11Cronograma.tsx` | Línea de tiempo de 5 semanas |
| 08 Logros | `E12Logros.tsx` | Evaluación, sobre el b-roll del aula |
| 09 Conclusión | `E13Conclusion.tsx` | "Aprendieron a detenerse antes de actuar…" |
| Cierre | `E14Cierre.tsx` | Agradecimiento y créditos |

`src/PresentacionVinculacion.tsx` une las escenas con transiciones (iris, slide, wipe,
clock-wipe, flip, fade) y la música de fondo. Cada escena también está registrada por separado
en Studio (carpeta *Escenas*) para editarla sola.

### Piezas reutilizables

- `components/PalabrasPorBloque.tsx` – texto que entra palabra por palabra; `resaltar` pinta palabras como bloques de color.
- `components/Camara.tsx` – zoom lento (Ken Burns), paneo y "golpes" de zoom de énfasis.
- `components/Aparecer.tsx` – entradas animadas (pop, desde los lados, giro).
- `components/Fondo.tsx` – fondo con manchas de color y figuras flotando.
- `components/Etiqueta.tsx` – píldora de capítulo y `<Sfx>` para efectos de sonido.
- `illustrations/` – niños, aula, caritas y las 6 ilustraciones de los talleres (hacen de b-roll).

## Audio

Toda la música (pop alegre en Do mayor, 96 BPM) y los efectos (whoosh, pop, tick, ding, riser,
impacto) se sintetizan con `scripts/generar-audio.py`, así que no hay problemas de derechos de autor.

## Cambiar el b-roll por fotos reales

Las evidencias fotográficas del documento (Figuras 1–19) no están incrustadas en el .docx. Para usarlas,
cópialas a `public/img/` y muéstralas con `<Img src={staticFile("img/foto.jpg")} />` dentro de un
`<Camara>` (por ejemplo en `E03Gancho.tsx` o `E12Logros.tsx` en lugar de `<Aula />`).

## Fuentes

Baloo 2 y Nunito (SIL Open Font License), incluidas en `public/fonts/`.
