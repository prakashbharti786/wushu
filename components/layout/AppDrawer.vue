<template>
  <MdDrawer
    :enable-swipe="true"
    :surface-width="320"
    type="modal"
    :show="show"
    @update:show="onUpdate"
  >
    <div class="md-drawer__header">
      <h3 class="md-drawer__title">Taxedwiser</h3>
      <h6 class="md-drawer__subtitle">
        E-file your Income tax return with ease
      </h6>
    </div>
    <div class="md-drawer-divider"></div>
    <div class="md-drawer__content">
      <nav class="md-list demo-list">
        <nuxt-link to="/" class="md-list-item" @click.native="hideDrawer">
          <div class="md-list-content">
            <div class="md-list-content__title">
              Home
            </div>
          </div>
        </nuxt-link>
        <nuxt-link
          to="/services"
          class="md-list-item"
          @click.native="hideDrawer"
        >
          <div class="md-list-content">
            <div class="md-list-content__title">
              Services
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/about" class="md-list-item" @click.native="hideDrawer">
          <div class="md-list-content">
            <div class="md-list-content__title">
              About us
            </div>
          </div>
        </nuxt-link>
        <div class="md-list-divider"></div>
        <div class="md-list-subhead">Help &amp; feedback</div>
        <nuxt-link
          to="/contact"
          class="md-list-item"
          @click.native="hideDrawer"
        >
          <div class="md-list-content">
            <div class="md-list-content__title">
              Contact us
            </div>
          </div>
        </nuxt-link>
        <nuxt-link
          to="/contact"
          class="md-list-item"
          @click.native="hideDrawer"
        >
          <div class="md-list-content">
            <div class="md-list-content__title">
              Feedback
            </div>
          </div>
        </nuxt-link>
      </nav>
    </div>
  </MdDrawer>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onUpdate(val) {
      this.$emit('update:show', val)
    },
    hideDrawer() {
      this.onUpdate(false)
    }
  }
}
</script>
