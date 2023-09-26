// const delay = (t: number) => new Promise((r) => setTimeout(r, t));
import { HomeSections, SectionItem } from "~/schema/models";
export const useHome = defineStore("home", {
  state: () => ({
    sections: [] as SectionItem[],
  }),

  getters: {},

  actions: {
    async fetchHome() {
      const data = JSON.parse(await $fetch("/api/hello", { method: "get" }));
      this.sections = Object.assign({}, data.sections);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHome, import.meta.hot));
}
