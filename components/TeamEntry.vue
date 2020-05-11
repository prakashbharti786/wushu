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
      @MDDialog:closing="onClosing"
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
            <div v-if="!file">
              <button
                type="button"
                class="md-button md-button--large md-button--raised md-radio--primary"
                @click="onUploadClick"
              >
                <i class="md-button__icon md-button__icon--right material-icons"
                  >publish</i
                >
                Attach CSV
              </button>
            </div>
            <div v-else class="md-d-flex md-align-items-center">
              <div class="">{{ file.name }}</div>
              <MdIconButton @click="onDeleteFile" icon="delete"></MdIconButton>
            </div>
            <input
              required
              ref="file"
              class="hidden-file-input"
              type="file"
              accept=".csv"
              @change="fileSelected"
            />
            <div class="md-mt-2">
              <p class="md-typography-black">
                Not sure how to get started?
              </p>
              <p>
                Download a CSV file, then edit and upload the file.
              </p>
              <div class="md-typography-subtitle1">
                Download blank
                <button
                  type="button"
                  class="md-button md-button--primary md-button--compact"
                  @click="downloadSampleCsv"
                >
                  <i
                    class="md-button__icon md-button__icon--right material-icons"
                    >get_app</i
                  >
                  CSV Template
                </button>
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
<style>
.hidden-file-input {
  visibility: hidden;
}
</style>
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
    windowWidth: null,
    file: null
  }),
  computed: {
    enableSubmit() {
      return this.file
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
    onDeleteFile() {
      this.file = null
    },
    changeWidth() {
      this.windowWidth = window.innerWidth
    },
    onInput(val, key) {
      this.$set(this.inputs, key, val)
    },
    onClosing() {
      this.file = null
      this.resetErrors()
    },
    resetErrors() {
      this.$set(this.errors, 'password', null)
      this.$set(this.errors, 'email', null)
    },
    fileSelected() {
      this.file = this.$refs.file.files[0]
    },
    onUploadClick() {
      this.$refs.file.click()
    },
    async onSubmit() {
      this.resetErrors()
      const fd = new FormData()
      fd.append('file', this.file)
      if (this.loading) {
        return false
      }
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$axios.$post('/bulk-upload', fd, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        alert('Submitted successfully!')
        this.$emit('update:show', false)
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
    },
    downloadSampleCsv() {
      const link = document.createElement('a')
      link.href = window.origin + '/sample.csv'
      link.setAttribute('download', 'sample.csv')
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>
