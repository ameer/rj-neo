// swiper.d.ts
export {};

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SwiperContainer: typeof import("swiper/vue")["Swiper"];
    SwiperSlide: typeof import("swiper/vue")["SwiperSlide"];
  }
}
