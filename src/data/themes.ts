export interface Palette {
  id: string;
  label: string;
  swatch: string; // shown as the picker dot
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
      { id: "cream", label: "Cream", swatch: "#1a7a4a" },
      { id: "sage", label: "Sage", swatch: "#4f5b3f" },
      { id: "rose", label: "Rose", swatch: "#8d3b5f" },
    ],
  },
  {
    id: "dark",
    label: "Dark",
    palettes: [
      { id: "teal", label: "Teal", swatch: "#5eead4" },
      { id: "violet", label: "Violet", swatch: "#a78bfa" },
      { id: "amber", label: "Amber", swatch: "#fbbf24" },
    ],
  },
  {
    id: "gradient",
    label: "Gradient",
    palettes: [
      { id: "violetpink", label: "Violet/Pink", swatch: "#ec4899" },
      { id: "bluecyan", label: "Blue/Cyan", swatch: "#22d3ee" },
      { id: "orangerose", label: "Orange/Rose", swatch: "#fb923c" },
    ],
  },
  {
    id: "swiss",
    label: "Swiss",
    palettes: [
      { id: "orange", label: "Orange", swatch: "#f97316" },
      { id: "blue", label: "Blue", swatch: "#2563eb" },
      { id: "red", label: "Red", swatch: "#dc2626" },
    ],
  },
];

export const DEFAULT_THEME = "paper";
export const DEFAULT_PALETTE = "cream";
