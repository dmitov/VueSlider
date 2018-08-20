<template>
  <div
    class="slider"
    :class="{'slider-loading': loading}"
    :style="`width: ${width}; height: ${height}`"
  >
    <!-- SLIDER BACK BUTTON -->
    <button
      @click="back"
      class="slider-button slider-button-back"
    >
      <slot name="button-back">
        <!-- FANCY SVG SOURCE: https://git.blivesta.com/flexicon/#modal-chevron-left -->
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"/>
        </svg>
      </slot>
    </button>

    <!-- SLIDER MAIN VIEW -->
    <div class="slider-view">
      <transition name="fade" v-if="images.length > 0">
        <img
          class="slider-image"
          :src="images[currentIndex].src"
          :key="currentIndex"
          @load="onLoaded(currentIndex)"
          :height="height"
          v-show="images[currentIndex].loaded"
        >
      </transition>
    </div>

    <!-- SLIDER NEXT BUTTON -->
    <button
      @click="next"
      class="slider-button slider-button-next"
    >
      <slot name="button-next">
        <!-- FANCY SVG SOURCE: https://git.blivesta.com/flexicon/#modal-chevron-right -->
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z"/>
        </svg>
      </slot>
    </button>
  </div>
</template>

<style lang="sass" scoped>
  // Importing scoped styles so they don't interfere
  // with any other CSS on the page.
  
  @import "./scss/slider.scss";
</style>

<script>
export default {
  props: {
    // Image source, valid will be any mocky.io gallery link.
    source: {
      type: String,
      default: 'http://www.mocky.io/v2/5b753d5f2e00006900535f6c'
    },
    // Width, applied to the component's wrapper.
    width: {
      type: String,
      default: '100%'
    },
    // Height, applied to the component's wrapper and image itself.
    height: {
      type: String,
      default: '570px'
    }
  },

  data () {
    return {
      // Loading boolean.
      loading: false,
      // Array containing all the images.
      images: [],
      // Current image index, pretty descriptive.
      currentIndex: 0
    }
  },

  mounted () {
    // Upon mount, we will fetch the resource URL.
    this.fetch()
  },

  methods: {
    // Main function to fetch the resource.
    fetch () {
      // Displaying the loading animation.
      this.loading = true

      // Fetching the resource
      fetch(this.source).then((response) => {
        // Parsing JSON
        return response.json().then((json) => {
          // Then, we will make a custom array of objects, 
          // containing the image and it's loading state.
          json.images.forEach((image) => {
            this.images.push({ src: image, loaded: false })
          })
        })
      })
    },

    // Next action, fired upon clicking a button, 
    // or perhaps in the future - via timer.
    next () {
      // If the current image is the last one, 
      // we will cycle back to the first one.
      if (this.currentIndex === this.images.length - 1) {
        this.currentIndex = 0
        return
      }

      // Otherwise, we will just bump up the index by 1
      this.currentIndex += 1
    },

    // Back action, fired upon clicking a button.
    back () {
      // If the current image is the first one, 
      // we will cycle back to the last one.
      if (this.currentIndex === 0) {
        this.currentIndex = this.images.length - 1
        return
      }

      // Otherwise, we will just put down the index by 1
      this.currentIndex -= 1
    },

    // Loaded event, changing the loading state of the image
    // and silently setting the base loading state to false
    onLoaded (index) {
      this.images[index].loaded = true

      this.loading = false
    }
  }
}
</script>
