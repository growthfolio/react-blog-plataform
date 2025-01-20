/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#1E3A8A", // Azul profundo
        light: "#3B82F6", // Azul médio (destaque)
        dark: "#1E293B", // Azul quase preto
      },
      secondary: {
        DEFAULT: "#2563EB", // Azul vibrante
        light: "#60A5FA", // Azul claro para interações
        dark: "#1D4ED8", // Azul escuro
      },
      accent: {
        DEFAULT: "#0EA5E9", // Azul ciano vibrante para pequenos destaques
        light: "#38BDF8", // Azul ciano claro
        dark: "#0284C7", // Azul ciano escuro
      },
      neutral: {
        DEFAULT: "#1E293B", // Fundo neutro escuro
        light: "#334155", // Cinza-azulado para bordas e backgrounds
        medium: "#64748B", // Cinza médio
        dark: "#0F172A", // Azul petróleo (quase preto)
      },
      background: "#0F172A", // Fundo geral escuro
      text: {
        DEFAULT: "#E2E8F0", // Texto claro
        muted: "#94A3B8", // Texto secundário
      },
    },
  },
};
export const plugins = [];
