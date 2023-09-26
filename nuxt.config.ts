// import vuetify from "vite-plugin-vuetify";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // build: { transpile: ["vuetify"] },
  // modules: [
  //   async (options, nuxt) => {
  //     nuxt.hooks.hook("vite:extendConfig", (config) =>
  //       // @ts-ignore
  //       config.plugins.push(vuetify())
  //     );
  //   },
  // ],
  devtools: { enabled: true },

  modules: ["vuetify-nuxt-module", "@pinia/nuxt", "@nuxtjs/eslint-module"],
  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
});
