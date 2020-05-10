<template>
  <section class="rx-section md-py-0">
    <div
      v-swiper:mySwiper="swiperOptionBlog"
      class="swiper-container cp-hero-slider"
    >
      <div class="swiper-wrapper">
        <div
          v-for="item in 6"
          :key="'fev-image' + item"
          class="swiper-slide swiper-slide--rex pmh-blog__posts md-my-2 md-mx-2"
        >
          <div
            class="swiper-image"
            :style="{ backgroundImage: `url(/slider/${item}.jpg)` }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.swiper-image {
  width: 420px;
  height: 420px;
  background-size: cover;
  background-position: center;
}
</style>

<script>
export default {
  name: 'ImageSlider',
  props: {
    disableHeading: {
      type: Boolean,
      default: false
    },
    isFetching: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    swiperOptionBlog: {
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: true,
      loop: true,
      loopedSlides: 1
    }
  }),
  computed: {
    enableList() {
      return this.itemList.length
    }
  }
}
</script>
