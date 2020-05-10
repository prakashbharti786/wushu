<template>
  <div class="md-flex-grow-1 md-align-items-center md-flex-grow-1--nowrap">
    <button
      id="google-btn"
      class="google-login md-button md-button--block md-button--large md-button--unelevated md-button--raised md-button--light"
      type="button"
    >
      <img
        :src="assetsUrl + 'img/svg/google-logo.svg'"
        style="height: 20px"
        class="md-button__icon"
      />
      <span>Continue with Google</span>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      assetsUrl: process.env.assetsUrl
    }
  }
}
</script>
