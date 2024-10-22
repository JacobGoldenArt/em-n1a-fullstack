// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@pinia/nuxt", "@nuxt/icon", "@unocss/nuxt"],
  icon: {
    customCollections: [
      {
        prefix: "em",
        dir: "./assets/em-icons",
      },
    ],
    class: "icon",
    mode: "svg",
  },
});