// const delay = (t: number) => new Promise((r) => setTimeout(r, t));
import { Playlist, Song } from '~/schema/models'
export const usePlayer = defineStore('player', {
  state: () => ({
    currentPlaylist: {} as Playlist,
    isPlaying: false,
    shuffle: true,
    itemsCount: 0,
    currentIndex: 0,
    shuffledIndices: [] as number[]
  }),

  getters: {
    prevIndex: state => (state.currentIndex - 1 + state.itemsCount) % state.itemsCount,
    nextIndex: state => (state.currentIndex + 1) % state.itemsCount,
    currentSong (): Song {
      const index = this.shuffle ? this.shuffledIndices[this.currentIndex] : this.currentIndex
      if (this.currentPlaylist.items !== undefined) {
        return this.currentPlaylist.items[index]
      }
      return {} as Song
    },
    src () {
      return this.currentSong.hls_link
    }
  },

  actions: {
    setCurrentPlaylist (playlist: Playlist) {
      this.currentPlaylist = Object.assign({}, playlist)
      this.itemsCount = this.currentPlaylist?.items_count
      this.currentIndex = 0
      this.shuffleIndices()
    },
    shuffleIndices () {
      const tempIndices = [...Array(this.itemsCount).keys()]
      for (let i = tempIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempIndices[i], tempIndices[j]] = [tempIndices[j], tempIndices[i]]
      }
      this.shuffledIndices = tempIndices
    },
    prev () {
      if (this.shuffle) {
        this.currentIndex = (this.currentIndex - 1 + this.shuffledIndices.length) % this.shuffledIndices.length
      } else {
        this.currentIndex = this.prevIndex
      }
    },
    next () {
      if (this.shuffle) {
        this.currentIndex = (this.currentIndex + 1) % this.shuffledIndices.length
        if (this.currentIndex === 0) {
          this.shuffleIndices()
        }
      } else {
        this.currentIndex = this.nextIndex
      }
    },
    random () : number {
      return Math.floor(Math.random() * this.itemsCount)
    },
    toggleShuffle () {
      this.shuffle = !this.shuffle
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayer, import.meta.hot))
}
