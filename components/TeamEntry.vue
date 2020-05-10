<template>
  <div>
    <MdDialog
      title="title"
      :show="show"
      :close-on-button-click="false"
      :class="{
        'md-dialog--full-screen': enableFullScreen,
        'md-dialog--lg': !enableFullScreen
      }"
      class="md-dialog--pp"
      @update:show="$emit('update:show', $event)"
      @MDDialog:action="handleAction"
    >
      <template slot="header">
        <div
          v-if="enableFullScreen"
          class="md-dialog__header-action-dismissive"
        >
          <MdIconButton
            class="md-icon-button--light"
            data-md-dialog-action="close"
            icon="close"
          />
        </div>
        <div class="md-dialog__header-title">Bulk team entry</div>
        <div
          v-if="enableFullScreen"
          class="md-dialog__header-action-affirmative"
        >
          <MdButton :outlined="true" class="md-button--light">
            <span class="md-button__label">Submit</span>
          </MdButton>
        </div>
      </template>
      <template>
        <div class="et-login-wrapper">
          <form class="md-mt-2 md-form" @submit.prevent="onSubmit">
            <p class="">
              Add or edit users by uploading a CSV file with their info such as
              passwords and organisational units.
            </p>
            <p>
              <b>Note:</b> Required fields are First Name, Surname, Email
              Address, Password and Org Unit Path.
            </p>
            <div class="">
              <button
                class="md-button md-button--large md-button--raised md-radio--primary"
              >
                <i class="md-button__icon md-button__icon--right material-icons"
                  >publish</i
                >
                Attach CSV
              </button>
            </div>
            <div class="md-mt-2">
              <p class="md-typography-black">
                Not sure how to get started?
              </p>
              <p>
                Download a CSV file, then edit and upload the file.
              </p>
              <div class="md-typography-subtitle1">
                Download blank<a
                  class="md-button md-button--primary md-button--compact"
                >
                  <i
                    class="md-button__icon md-button__icon--right material-icons"
                    >get_app</i
                  >
                  CSV Template</a
                >
              </div>
            </div>
            <input type="reset" class="no-render no-render--reset" />
            <input type="submit" class="no-render no-render--submit" />
          </form>
        </div>
      </template>
      <template slot="footer">
        <div class="md-flex-grow-1"></div>
        <MdButton class="md-ml-1" data-md-dialog-action="close">
          Cancel
        </MdButton>
        <MdButton
          class="md-ml-1 md-button--primary"
          :outlined="true"
          :disabled="!enableSubmit"
          data-md-dialog-action="accept"
        >
          Upload
        </MdButton>
      </template>
    </MdDialog>
  </div>
</template>

<script>
export default {
  name: 'TeamEntry',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    inputs: {
      email: '',
      password: ''
    },
    errors: {
      email: null,
      password: null
    },
    icon: 'visibility',
    passwordType: 'password',
    loading: false,
    windowWidth: null
  }),
  computed: {
    enableSubmit() {
      return (
        this.inputs.email &&
        this.validEmail(this.inputs.email) &&
        this.inputs.password.length > 5
      )
    },
    getQueryString() {
      return this.$route.fullPath.substring(this.$route.path.length)
    },
    enableFullScreen() {
      return this.windowWidth < 959
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.changeWidth)
  },
  beforeDestroy() {
    this.loading = false
    this.$store.commit('core/setAppLoading', false)
    window.removeEventListener('resize', this.changeWidth)
  },
  methods: {
    changeWidth() {
      this.windowWidth = window.innerWidth
    },
    onInput(val, key) {
      this.$set(this.inputs, key, val)
    },
    changeType() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.icon = 'visibility_off'
      } else {
        this.passwordType = 'password'
        this.icon = 'visibility'
      }
    },
    validEmail(email) {
      // eslint-disable-next-line no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    resetErrors() {
      this.$set(this.errors, 'password', null)
      this.$set(this.errors, 'email', null)
    },
    async onSubmit() {
      this.resetErrors()
      if (this.loading) {
        return false
      }
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        const data = await this.$store.dispatch('auth/signIn', {
          email: this.inputs.email.trim(),
          password: this.inputs.password
        })
        this.$emit('signinSuccess', data)
      } catch (e) {
        this.handleError(e)
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },
    handleError(errorResponse) {
      if (
        errorResponse &&
        (errorResponse.status === 400 || errorResponse.status === 401)
      ) {
        const errors = errorResponse.data
        errors.forEach((item) => {
          this.errors[item.field] = item.message
          this.$nextTick(() => {
            this.$refs[item.field].$el
              .querySelector('.md-text-field__input')
              .focus()
          })
        })
      }
    },
    refreshData() {
      Object.keys(this.item).forEach((key) => {
        this.$set(this.inputs, key, this.item[key])
      })
    },
    handleAction(e) {
      if (e.action === 'close') {
        this.$emit('update:show', false)
      } else {
        this.onSubmitClick()
      }
    },
    onSubmitClick() {
      document.querySelector('.no-render--submit').click()
    }
  }
}
</script>
