<template>
  <div>
    <div class="d-flex align-center">
      <v-btn :icon="player.shuffle ? 'mdi-shuffle' : 'mdi-shuffle-disabled'" :variant="'flat'" @click="player.toggleShuffle()" />
      <v-spacer />
      <v-btn :icon="'mdi-skip-backward'" :variant="'flat'" @click="player.prev()" />
      <v-btn :icon="player.isPlaying ? 'mdi-pause' : 'mdi-play'" :variant="'flat'" @click="toggle" />
      <v-btn :icon="'mdi-skip-forward'" :variant="'flat'" @click="player.next()" />
    </div>
    <div class="d-flex align-center">
      <span>{{ currentTimerText }}</span>
      <v-slider
        thumb-label
        :hide-details="true"
        :model-value="currentTime"
        :min="0"
        :max="duration"
        @start="onSeekStart"
        @end="onSeekEnd"
      >
        <template #thumb-label="{ modelValue }">
          {{ convertTime(modelValue) }}
        </template>
      </v-slider>
      <span>{{ durationText }}</span>
    </div>
    <audio
      id="video"
      ref="audioElem"
      class="d-none"
    />
  </div>
</template>
<script setup lang="ts">
import Hls from 'hls.js'
const player = usePlayer()
const audioElem = ref<HTMLMediaElement>()
const currentTime = ref()
const duration = ref()

// Methods
const attach = (element: HTMLMediaElement) => {
  if (player.src) {
    // @ts-ignore
    const hls = new Hls()
    hls.loadSource(player.src)
    hls.attachMedia(element)
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: player.currentSong.title,
        artist: player.currentSong.artist,
        artwork: [
          { src: player.currentSong.photo_player, sizes: '256x256', type: 'image/jpeg' }
        ]
      })
    }
  }
}
const onSeekStart = (time: number) => {
  audioElem.value.currentTime = time
  audioElem.value?.pause()
}
const onSeekEnd = (time: number) => {
  audioElem.value.currentTime = time
  audioElem.value?.play()
}
const toggle = () => {
  if (player.isPlaying) {
    audioElem.value?.pause()
  } else {
    audioElem.value?.play()
  }
}
const convertTime = (value: number) => {
  let curmin: string | number = Math.floor(value / 60)
  let cursec: string | number = Math.floor(
    value - curmin * 60
  )
  curmin = isNaN(curmin) ? 0 : curmin
  cursec = isNaN(cursec) ? 0 : cursec
  if (curmin < 10) {
    curmin = '0' + curmin
  }
  if (cursec < 10) {
    cursec = '0' + cursec
  }
  return curmin + ':' + cursec
}
// Watch
watchEffect(() => {
  if (audioElem.value) {
    attach(audioElem.value)
    audioElem.value.addEventListener('playing', function () {
      player.isPlaying = true
    })
    audioElem.value.addEventListener('pause', function () {
      player.isPlaying = false
    })
    audioElem.value.addEventListener('durationchange', function () {
      duration.value = audioElem.value?.duration
    })
    audioElem.value.addEventListener('timeupdate', function () {
      currentTime.value = audioElem.value?.currentTime.toFixed()
    })
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})

// Computed
const currentTimerText = computed(() => {
  let curmin: string | number = Math.floor(currentTime.value / 60)
  let cursec: string | number = Math.floor(
    currentTime.value - curmin * 60
  )
  curmin = isNaN(curmin) ? 0 : curmin
  cursec = isNaN(cursec) ? 0 : cursec
  if (curmin < 10) {
    curmin = '0' + curmin
  }
  if (cursec < 10) {
    cursec = '0' + cursec
  }
  return curmin + ':' + cursec
})
const durationText = computed(() => {
  let durmin: string | number = Math.floor(duration.value / 60)
  let dursec: string | number = Math.floor(
    duration.value - durmin * 60
  )
  durmin = isNaN(durmin) ? 0 : durmin
  dursec = isNaN(dursec) ? 0 : dursec
  if (durmin < 10) {
    durmin = '0' + durmin
  }
  if (dursec < 10) {
    dursec = '0' + dursec
  }
  return durmin + ':' + dursec
})
</script>
<style>

</style>
