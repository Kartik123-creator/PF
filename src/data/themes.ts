export interface Palette {
  id: string;
  label: string;
  bg: string; // background half of the picker dot (the theme's paper colour)
  primary: string; // accent half of the picker dot
}

export interface Theme {
  id: string;
  label: string;
  palettes: Palette[];
}

export const THEMES: Theme[] = [
  {
    id: "paper",
    label: "Paper",
    palettes: [
      { id: "cream", label: "Cream", bg: "#f6eee3", primary: "#1a7a4a" },
      { id: "sage", label: "Sage", bg: "#eef1e7", primary: "#54712c" },
      { id: "rose", label: "Rose", bg: "#f1eaee", primary: "#8d3b5f" },
    ],
  },
  {
    id: "dark",
    label: "Dark",
    palettes: [
      { id: "teal", label: "Teal", bg: "#0f172a", primary: "#5eead4" },
      { id: "violet", label: "Violet", bg: "#13111c", primary: "#a78bfa" },
      { id: "rose", label: "Rosé", bg: "#1a1216", primary: "#fb7185" },
    ],
  },
  {
    id: "gradient",
    label: "Gradient",
    palettes: [
      { id: "violetpink", label: "Violet/Pink", bg: "#0c0a1d", primary: "#a78bfa" },
      { id: "bluecyan", label: "Blue/Cyan", bg: "#0a1120", primary: "#60a5fa" },
      { id: "orangerose", label: "Orange/Rose", bg: "#1c0f0a", primary: "#fb923c" },
    ],
  },
  {
    id: "swiss",
    label: "Swiss",
    palettes: [
      { id: "orange", label: "Orange", bg: "#fafafa", primary: "#c2410c" },
      { id: "blue", label: "Blue", bg: "#fafafa", primary: "#2563eb" },
      { id: "red", label: "Red", bg: "#fafafa", primary: "#dc2626" },
    ],
  },
];

export const DEFAULT_THEME = "paper";
export const DEFAULT_PALETTE = "cream";
