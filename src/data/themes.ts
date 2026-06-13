export interface Palette {
  id: string;
  label: string;
  swatch: string; // left half of the picker dot (primary)
  swatch2: string; // right half of the picker dot (second accent)
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
      { id: "cream", label: "Cream", swatch: "#1a7a4a", swatch2: "#0e7490" },
      { id: "sage", label: "Sage", swatch: "#54712c", swatch2: "#7c5a2e" },
      { id: "rose", label: "Rose", swatch: "#8d3b5f", swatch2: "#b03a52" },
    ],
  },
  {
    id: "dark",
    label: "Dark",
    palettes: [
      { id: "teal", label: "Teal", swatch: "#5eead4", swatch2: "#38bdf8" },
      { id: "violet", label: "Violet", swatch: "#a78bfa", swatch2: "#f0abfc" },
      { id: "rose", label: "Rosé", swatch: "#fb7185", swatch2: "#f0abfc" },
    ],
  },
  {
    id: "gradient",
    label: "Gradient",
    palettes: [
      { id: "violetpink", label: "Violet/Pink", swatch: "#a78bfa", swatch2: "#ec4899" },
      { id: "bluecyan", label: "Blue/Cyan", swatch: "#60a5fa", swatch2: "#22d3ee" },
      { id: "orangerose", label: "Orange/Rose", swatch: "#fb923c", swatch2: "#f43f5e" },
    ],
  },
  {
    id: "swiss",
    label: "Swiss",
    palettes: [
      { id: "orange", label: "Orange", swatch: "#c2410c", swatch2: "#ea580c" },
      { id: "blue", label: "Blue", swatch: "#2563eb", swatch2: "#1d4ed8" },
      { id: "red", label: "Red", swatch: "#dc2626", swatch2: "#b91c1c" },
    ],
  },
];

export const DEFAULT_THEME = "paper";
export const DEFAULT_PALETTE = "cream";
