<template>
  <section
    id="cookie-alert"
    :class="{ 'rx-policy-wrapper--visible': !accepted }"
    class="rx-policy-wrapper"
  >
    <div
      class="md-container et-container--narrow md-shadow-16dp rx-policy__surface"
    >
      <div class="md-row md-align md-align--start-center">
        <div class="md-col md-col--8">
          <p class="md-mb-0 rx-policy__text">
            Cookies help us improve our web content and deliver a personalised
            experience. By using this website, you agree to our use of cookies.
          </p>
        </div>
        <div class="md-layout-spacer" />
        <div class="md-col">
          <div class="rx-policy__actions layout-m-l-1--gt-sm md-layout">
            <nuxt-link class="md-button md-button--outline" to="/privacy">
              <i class="material-icons md-button__icon">open_in_browser</i>Our
              Policy
            </nuxt-link>
            <button
              class="md-ml-2 md-button md-button--raised md-button--flat md-button--accent"
              @click="acceptCookie"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.rx-policy-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(100%);
  transition-property: transform;
  transition-duration: 0.3s;
  padding: 24px 0;
  transition-timing-function: ease-in-out;
  z-index: 24;
}
.et-container--narrow {
  max-width: 824px;
}

.rx-policy-wrapper--visible {
  transform: none;
}

.rx-policy__surface {
  border-radius: 8px;
  padding: 24px 16px;
  background-color: var(--color-app-card-background);
}

@media (max-width: 767px) {
  .rx-policy__surface {
    border-radius: 8px;
    padding: 24px 0;
    background-color: var(--color-app-card-background);
  }
  .rx-policy__text {
    width: 100%;
  }
  .rx-policy__actions {
    width: 100%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      accepted: 1
    }
  },
  mounted() {
    const isCookieAccepted = localStorage.getItem('cookieAccepted')
    if (!isCookieAccepted) {
      this.accepted = 0
    }
  },
  methods: {
    acceptCookie() {
      localStorage.setItem('cookieAccepted', 1)
      this.accepted = 1
    }
  }
}
</script>
