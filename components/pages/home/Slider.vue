<template>
  <section class="rx-section md-py-0">
    <div
      v-if="enableList"
      v-swiper:mySwiper="swiperOptionBlog"
      class="swiper-container cp-hero-slider"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in itemList"
          :key="'blog-image' + index"
          class="swiper-slide swiper-slide--rex pmh-blog__posts md-my-2 md-mx-2"
        >
          <div class="md-card cp-card-person">
            <div
              class="md-card__profile"
              :style="{ backgroundImage: `url(${item.img})` }"
            ></div>
            <div class="md-flex-grow-1"></div>
            <section class="md-card__primary">
              <div class="md-card__title-text md-card__title-text--large">
                <div class="md-d-flex md-flex-grow-1">
                  {{ item.name }}
                </div>
              </div>
            </section>
            <section class="md-card__supporting-text">
              {{ item.position }}
            </section>
          </div>
        </div>
      </div>
      <div slot="pagination" class="swiper-pagination md-d-none-sm"></div>
    </div>
  </section>
</template>

<style>
.hidden-img {
  opacity: 0;
}
.md-card__profile {
  height: 140px;
  width: 140px;
  border-radius: 50%;
  margin: 16px auto 0;
  overflow: hidden;
  background-size: cover;
}
.cp-card-person {
  max-width: 250px;
  min-height: 270px;
  max-height: 200px;
}
</style>

<script>
export default {
  name: 'Slider',
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
    assetsUrl: process.env.assetsUrl,
    swiperOptionBlog: {
      slidesPerView: 2,
      spaceBetween: 24,
      autoplay: true,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        // when window width is <= 480px
        768: {
          slidesPerView: 3,
          spaceBetween: 16
        },
        // when window width is <= 640px
        959: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      }
    },
    itemList: [
      {
        name: 'Bhupendra Singh Bajwa',
        position: 'President, Wushu Association of India',
        img: '/images/bhupendra.jpeg'
      },
      {
        name: 'Jitendra Singh Bajwa',
        position: 'General Secretary, Bihar Wushu Association',
        img: '/images/jitendra.jpeg'
      },
      {
        name: 'Suhel Ahmad',
        position: 'CEO - Wushu Association of India',
        img: '/images/suhel.jpeg'
      },
      {
        name: 'Dinesh Kr. Mishra',
        position: 'General Secretary, Bihar Wushu Association',
        img: '/images/dinesh.jpeg'
      }
    ]
  }),
  computed: {
    enableList() {
      return this.itemList.length
    }
  }
}
</script>
