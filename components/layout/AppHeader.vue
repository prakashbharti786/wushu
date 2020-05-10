<template>
  <header
    id="et-navbar"
    role="banner"
    style="background: #fff"
    class="md-top-app-bar md-top-app-bar--casting-border md-top-app-bar--fixed"
  >
    <div class="md-container md-container--gutter-24-md md-container--gutter">
      <div class="md-top-app-bar__row md-align-items-center">
        <a href="/" class="md-top-app-bar__brand nuxt-link-exact-active">
          <img
            alt="Fitmetix logo"
            aria-hidden="true"
            style="height: 40px"
            src="/logo.jpg"
            class="gb_0a gb_Fe"
          />
        </a>
        <div class="md-top-app-bar__title md-d-none md-d-flex-sm">
          Bihar Wushu Association
        </div>
        <div class="md-flex-grow-1" />
        <div v-if="isAuthenticated" class="md-top-app-bar__toolbar">
          <MdButton label="Log out" theme="primary" @click="logout" />
        </div>
        <div v-else="" class="md-top-app-bar__toolbar">
          <MdButton
            label="Member Log in"
            theme="primary"
            :outlined="true"
            @click="login"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '@/mixins/event-bus'

export default {
  data: () => ({
    navs: [
      {
        link: '/contact',
        title: 'Sign In',
        type: 'nuxtLink',
        auth: 'common'
      }
    ],
    authUrl: process.env.authUrl
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    getQueryString() {
      return this.$route.fullPath.substring(this.$route.path.length)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
    login() {
      EventBus.$emit('onLoginButtonClicked')
    }
  },
  head() {
    return {
      bodyAttrs: {
        'data-shimmer': true
      }
    }
  }
}
</script>
