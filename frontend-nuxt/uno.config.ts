import {
  defineConfig,
  presetTypography,
  presetWebFonts,
  presetWind,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,500,600,700",
        mono: "Fira Code:400,500,600,700",
      },
    }),
  ],
  // ...UnoCSS options
});
