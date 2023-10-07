<template>
  <div>
    <video
      id="video"
      controls
      autoplay
      playsinline
      class="videoCentered"
      style="width: 80%"
    />
  </div>
</template>
<script>
import Hls from 'hls.js'
export default {
  mounted () {
    const video = document.getElementById('video')
    const videoSrc = 'https://host2.mediacon-rj.app/media/mp3/mp3-hls/120108-f04aeac674861fa/playlist.m3u8'
    const hls = new Hls()
    hls.loadSource(videoSrc)
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log(`HLS attached to video element ${hls}`)
    })
    hls.attachMedia(video)
  }
}
</script>
