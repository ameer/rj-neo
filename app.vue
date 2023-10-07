<template>
  <VApp theme="dark">
    <v-app-bar>
      <v-app-bar-title>RJ Neo</v-app-bar-title>
    </v-app-bar>
    <VMain>
      <NuxtPage />
    </VMain>
    <v-footer>
      <v-bottom-sheet
        :model-value="true"
        :scrim="false"
        :scroll-strategy="'none'"
        :close-on-content-click="false"
        :persistent="true"
        :no-click-animation="true"
      >
        <v-card class="fill-height">
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-btn text="Play" @click="player.play()" />
                <v-btn text="pause" @click="player.pause()" />
                <video
                  id="video"
                  ref="player"
                  controls
                  autoplay
                  playsinline
                  class="videoCentered"
                  style="width: 80%"
                />
              </v-col>
              <v-col cols="6">
                <v-slider />
              </v-col>
              <v-col cols="3">
                Download
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-bottom-sheet>
    </v-footer>
  </VApp>
</template>
<script setup lang="ts">
import Hls from 'hls.js'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'
const player = ref()
const attach = (element: HTMLMediaElement) => {
  const hls = new Hls()
  const videoSrc = 'https://host2.mediacon-rj.app/media/mp3/mp3-hls/120108-f04aeac674861fa/playlist.m3u8'
  hls.loadSource(videoSrc)
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    console.log(`HLS attached to video element ${hls}`)
  })
  hls.attachMedia(element)
}
watchEffect(() => {
  if (player.value) {
    attach(player.value)
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})
</script>
