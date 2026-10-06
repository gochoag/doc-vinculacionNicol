import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const FAMILIA_TITULO = "Baloo 2";
const FAMILIA_TEXTO = "Nunito";

// Entre comillas: "Baloo 2" contiene un dígito y sin comillas no es un nombre CSS válido.
export const FONT_TITULO = `"${FAMILIA_TITULO}", sans-serif`;
export const FONT_TEXTO = `"${FAMILIA_TEXTO}", sans-serif`;

const fuentes = [
  { family: FAMILIA_TITULO, file: "baloo-2-latin-600-normal.woff2", weight: "600" },
  { family: FAMILIA_TITULO, file: "baloo-2-latin-700-normal.woff2", weight: "700" },
  { family: FAMILIA_TITULO, file: "baloo-2-latin-800-normal.woff2", weight: "800" },
  { family: FAMILIA_TEXTO, file: "nunito-latin-600-normal.woff2", weight: "600" },
  { family: FAMILIA_TEXTO, file: "nunito-latin-700-normal.woff2", weight: "700" },
  { family: FAMILIA_TEXTO, file: "nunito-latin-800-normal.woff2", weight: "800" },
];

for (const f of fuentes) {
  loadFont({
    family: f.family,
    url: staticFile(`fonts/${f.file}`),
    weight: f.weight,
  });
}

// Paleta: cálida e infantil, cada emoción tiene su color.
export const C = {
  crema: "#FFF7EC",
  arena: "#FCE9D2",
  tinta: "#1F2A44",
  tintaSuave: "#4A5578",
  alegria: "#FFC93C",
  calma: "#2EC4B6",
  enojo: "#FF5A5F",
  tristeza: "#4D96FF",
  miedo: "#9B5DE5",
  verde: "#6BCB77",
  naranja: "#FF8C42",
  rosa: "#FF8FAB",
  blanco: "#FFFFFF",
  noche: "#16213E",
};

export const PIELES = ["#8D5524", "#C68642", "#5C3A1E", "#E0AC69", "#7B4B2A", "#A0522D"];
