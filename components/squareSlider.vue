<template>
    <swiper-container :id="swiperId" :ref="(el) => {
        swiperEl = <HTMLElement>el;
    }
        " :init="false">
        <swiper-slide v-for="item in props.items" :key="item.id">
            <v-card>
                <v-img cover :src="item.photo" class="align-end"
                    :gradient="`to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 100%`" aspect-ratio="1" :alt="item.title"
                    :title="item.title">
                    <template #error>
                        <v-img class="mx-auto" aspect-ratio="1" src="/fallback.jpg" />
                    </template>
                </v-img>
                <v-card-actions>
                    <v-btn color="white" variant="text" icon="mdi-play"></v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </swiper-slide>
    </swiper-container>
</template>
<script setup lang="ts">
import { PlaylistItem } from '~/schema/models'
const props = defineProps({
    swiperId: { type: String, required: true },
    items: { type: Array as PropType<Array<PlaylistItem>>, required: true }
})
const swiperEl = ref<HTMLElement | null>(null)
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