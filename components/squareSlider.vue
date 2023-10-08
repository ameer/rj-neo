<template>
  <swiper-container :id="swiperId" :ref="(el) => {swiperEl = el }" :init="false">
    <swiper-slide v-for="item in props.items" :key="item.id">
      <v-card>
        <v-img
          cover
          :src="item.photo"
          class="align-end"
          :gradient="`to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 100%`"
          aspect-ratio="1"
          :lazy-src="`/fallback.jpg`"
          :alt="item.title"
          :title="item.title"
        >
          <template #error>
            <v-img class="mx-auto" aspect-ratio="1" src="/fallback.jpg" />
          </template>
        </v-img>
        <v-card-actions>
          <v-btn color="white" variant="text" icon="mdi-play" @click="getPlaylist(item.id)" />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </swiper-slide>
  </swiper-container>
</template>
<script setup lang="ts">
import { ComponentPublicInstance } from 'nuxt/dist/app/compat/capi'
import { PlaylistItem } from '~/schema/models'
import { usePlayer } from '~/stores/player'
const props = defineProps({
  swiperId: { type: String, required: true },
  items: { type: Array as PropType<Array<PlaylistItem>>, required: true }
})
const player = usePlayer()
const { setCurrentPlaylist } = player

const swiperEl = ref<Element | ComponentPublicInstance | null>(null)
const getPlaylist = (playlistId: string) => {
  $fetch(`/api/playlists/${playlistId}`).then((resp) => {
    setCurrentPlaylist(resp)
  })
}
onMounted(() => {
  const swiperParams = {
    slidesPerView: 2.5,
    spaceBetween: 15,
    navigation: true,
    breakpoints: {
      640: {
        slidesPerView: 3.5
      },
      1024: {
        slidesPerView: 6.5,
        spaceBetween: 30
      }
    },
    injectStyles: [
            `
      :host(.red) .swiper-wrapper {
        background-color: red;
      }
      `
    ],
    on: {
      init () {
        console.log('Init')
      }
    }
  }
  Object.assign(swiperEl.value, swiperParams)
  swiperEl.value.initialize()
})
</script>
