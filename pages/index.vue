<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <VContainer>
    <VRow>
      <VCol :cols="12">
        <swiper-container :init="false" id="top" ref="swiperEl">
            <swiper-slide v-for="item in home.sections[1]?.items" :key="item.id">
              <v-card>
                <v-img cover :src="item.photo" class="align-end" aspect-ratio="1">
                </v-img>
              </v-card>
            </swiper-slide>
          </swiper-container>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script setup lang="ts">


const home = useHome();
const { fetchHome } = home;
const swiperEl = ref<HTMLElement | null>(null)
onMounted(() => {
  fetchHome();
  const swiperParams = {
    slidesPerView: 2.5,
    spaceBetween: 15,
    breakpoints: {
      640: {
        slidesPerView: 3.5,
      },
      1024: {
        slidesPerView: 6.5,
        spaceBetween: 30,
      },
    },
    on: {
      init() {
        console.log('Init');
        
      },
    },
  };

  // now we need to assign all parameters to Swiper element
  Object.assign(swiperEl.value, swiperParams);
  swiperEl.value.initialize()
});
</script>
