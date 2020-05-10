<template>
  <div>
    <AppHeader @drawerToggle="drawerToggle" />
    <nuxt class="main-layout" />
    <MdOverlay v-if="appLoading" :fixed="true" :show="true" :cover="true">
      <MdCircularProgress theme="accent" :size="48" />
    </MdOverlay>
    <AppDrawer :show.sync="show" />
  </div>
</template>

<style>
.main-layout {
  min-height: calc(100vh - 120px);
}
.no-render {
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  visibility: hidden;
}
.rx-section {
  padding: 32px 0;
  max-width: 100vw;
  overflow-x: hidden;
}

@media (min-width: 600px) {
  .cp-height-auto-sm {
    min-height: auto;
  }
}

@media (max-width: 599px) {
  .rx-section {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
.rx-list-text li {
  padding-left: 24px;
  position: relative;
  line-height: 1.6;
}
.rx-list-text li:before {
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
.rx-list-text li:before {
  content: 'send';
  position: absolute;
  top: 0;
  left: 0;
  font-family: Material Icons;
  width: 24px;
  height: 24px;
}
.rx-list-text--primary li:before {
  color: RGB(var(--color-primary));
}
/*
process
*/
.et-process {
  width: 258px;
  display: flex;
  flex-direction: column;
  margin: 12px auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid var(--color-app-divider);
  border-radius: 8px;
  padding: 16px 16px;
}
.et-container--narrow {
  max-width: 520px;
}

.et-process__icon {
  width: 56px;
  height: 56px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
}
.et-process__icon .material-icons {
  line-height: 56px;
  font-size: 28px;
}
.rx-slider-section {
  height: calc(80vh - 64px);
  max-height: 520px;
  min-height: 480px;
  position: relative;
}

@media (max-width: 600px) {
  .rx-slider-section {
    height: auto;
    max-height: none;
  }
}
.et-banner {
  padding-right: 32px;
}
@media (max-width: 960px) {
  .et-banner {
    padding-right: 0;
  }
  .rt-text-center-sm {
    text-align: center;
  }
  .rt-justify-center-sm {
    justify-content: center;
  }
}
@media (max-width: 599px) {
  .et-process {
    max-width: 100%;
    padding: 12px;
  }
  .et-process__icon {
    width: 48px;
    height: 48px;
  }
  .et-process__icon .material-icons {
    line-height: 48px;
  }
  .et-process-wrapper {
    justify-content: flex-start;
  }
}
.md-color-primary-gradient {
  position: absolute;
}
.md-dialog--full-screen .md-dialog__surface {
  --dialog-border-radius: 0;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
}
@media (max-width: 640px) {
  .expand-on-sm {
    width: 100%;
  }
  .expand-on-sm img {
    max-height: 60vh !important;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
import AppHeader from '@/components/layout/AppHeader'
import AppDrawer from '@/components/layout/AppDrawer'
// import AppBreadcrumb from '../components/ui/AppBreadcrumb'

export default {
  components: {
    AppHeader,
    AppDrawer
  },
  data: () => ({
    assetsUrl: 'test',
    show: false
  }),
  computed: {
    ...mapGetters({
      appLoading: 'core/appLoading'
    })
  },
  mounted() {},
  methods: {
    drawerToggle() {
      this.show = !this.show
    }
  },
  head: () => ({
    bodyAttrs: {
      class: 'has-fixed-header'
    }
  })
}
</script>
