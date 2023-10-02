<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <VContainer>
    <VRow>
      <VCol
        v-for="(section, i) in home.sections"
        :key="`home-section-${i}`"
        :cols="12"
      >
        <span
          v-if="section.type === 'header'"
          class="text-h5 font-weight-bold"
          v-text="section.title"
        />
        <SquareSlider
          v-else-if="
            section.type === 'slider_square' && section.id !== 'home_music'
          "
          :swiper-id="section.id"
          :items="section.items"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
<!--
  [
    "header",
    "slider_square",
    "header",
    "slider",
    "slider",
    "header",
    "selfies",
    "header",
    "grid",
    "header",
    "slider_square",
    "header",
    "recently_played",
    "header",
    "slider_square",
    "header",
    "slider_square",
    "header",
    "slider_square",
    "header",
    "slider_square"
]
 -->
<script setup lang="ts">
const home = useHome()
const { fetchHome } = home
onMounted(() => {
  fetchHome()
})
</script>
