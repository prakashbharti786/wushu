<template>
  <section class="md-layout-rel md-bg-white">
    <section class="md-container md-container--box md-layout-rel">
      <div
        class="rx-slider-section md-d-flex md-flex-column md-align-items-center md-justify-content-center"
      >
        <div
          id="start"
          style="width: 100%"
          class="rx-slider md-row md-align-items-center md-flex-column-reverse md-flex-row-sm"
        >
          <div class="md-col md-col--12 md-col--6-md">
            <div class="text-img__copy left et-banner rt-text-center-sm">
              <h1
                class="md-mb-2 md-typography-headline5 md-typography-headline4-md md-oh-y"
              >
                <span
                  class="md-d-inline-block cp-animate cp-animate--fade-up md-typography-font-bold"
                >
                  1<sup>st</sup> Bihar State Online Wushu Taolu Championship
                  2020
                </span>
              </h1>
              <p
                class="md-mb-3 md-typography-font-light md-typography-title cp-animate cp-animate--fade"
              >
                Organized by Bihar Wushu Association
              </p>
              <div
                data-animation-delay="150"
                class="md-layout column-on-mobile rt-justify-center-sm cp-animate cp-animate--fade"
              >
                <MdButton
                  tag="a"
                  type=""
                  size="large"
                  href="#entry"
                  class="md-button md-button--large md-button--outlined md-button--primary"
                >
                  Submit entry
                </MdButton>
                <MdButton
                  tag="a"
                  type=""
                  size="large"
                  href="#event"
                  class="md-ml-2"
                  theme="primary"
                  :raised="true"
                  :un-eleveted="true"
                >
                  View event details
                </MdButton>
              </div>
            </div>
          </div>
          <div
            class="md-col md-col--12 md-col--6-md md-align-items-center expand-on-sm"
          >
            <ImageSlider />
          </div>
          <div class="md-layout-spacer" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import ImageSlider from '@/components/pages/home/ImageSlider'
export default {
  components: { ImageSlider },
  data: () => ({
    assistantUrl: process.env.assistantUrl,
    assetsUrl: process.env.assetsUrl
  })
}
</script>
