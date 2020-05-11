<template>
  <div>
    <MdDialog
      title="title"
      :show="show"
      :close-on-button-click="false"
      :close-on-backdrop-click="false"
      :close-on-scrim-click="false"
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
        <div class="md-dialog__header-title">
          Register for event (Individual)
        </div>
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
            <div class="md-form__row">
              <MdTextField
                ref="name"
                class="md-flex--grow"
                :required="true"
                :value="inputs.name"
                :error-text="errors.name"
                :invalid="!!errors.name"
                :maxlength="50"
                uid="name"
                label="Name"
                name="name"
                @input="onInput($event, 'name')"
              />
            </div>
            <div class="md-form__row">
              <MdTextField
                ref="father_name"
                class="md-flex--grow"
                :required="true"
                :value="inputs.father_name"
                :error-text="errors.father_name"
                :invalid="!!errors.father_name"
                :maxlength="50"
                uid="father_name"
                label="Father name"
                name="father_name"
                @input="onInput($event, 'father_name')"
              />
            </div>
            <div class="md-form__row">
              <MdTextField
                ref="father_name"
                class="md-flex--grow"
                :required="true"
                :value="convertDate(inputs.dob)"
                :error-text="errors.dob"
                :invalid="!!errors.dob"
                type="date"
                uid="dob"
                label="Date of birth"
                name="dob"
                @input="onInput($event, 'dob')"
              />
            </div>
            <div class="md-form__row">
              <MdTextField
                ref="mobile"
                class="md-flex--grow"
                :required="true"
                :value="inputs.mobile"
                :error-text="errors.mobile"
                :invalid="!!errors.mobile"
                :maxlength="10"
                uid="mobile"
                type="tel"
                label="Mobile"
                name="mobile"
                @input="onInput($event, 'mobile')"
              />
            </div>
            <div class="md-form__row">
              <MdTextField
                ref="district"
                class="md-flex--grow"
                :required="true"
                :value="inputs.district"
                :error-text="errors.district"
                :invalid="!!errors.district"
                :maxlength="50"
                uid="district"
                label="District"
                name="district"
                @input="onInput($event, 'district')"
              />
            </div>
            <div class="md-form__row">
              <MdTextField
                ref="aadhaar_no"
                class="md-flex--grow"
                :required="true"
                :value="inputs.aadhaar_no"
                :error-text="errors.aadhaar_no"
                :invalid="!!errors.aadhaar_no"
                :maxlength="12"
                type="number"
                uid="aadhaar_no"
                label="Aadhaar no"
                name="aadhaar_no"
                @input="onInput($event, 'aadhaar_no')"
              />
            </div>
            <div class="md-form__row">
              <MdTextField
                ref="category"
                class="md-flex--grow"
                :required="true"
                :value="inputs.category"
                :error-text="errors.category"
                :invalid="!!errors.category"
                :maxlength="50"
                type="text"
                uid="category"
                label="Category"
                name="category"
                @input="onInput($event, 'category')"
              />
            </div>
            <div class="md-form__row">
              <MdTextField
                ref="event"
                class="md-flex--grow"
                :required="true"
                :value="inputs.event"
                :error-text="errors.event"
                :invalid="!!errors.event"
                :maxlength="50"
                type="text"
                uid="event"
                label="Event"
                name="event"
                @input="onInput($event, 'event')"
              />
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
          data-md-dialog-action="accept"
        >
          {{ inputs.id ? 'Update' : 'Submit' }}
        </MdButton>
      </template>
    </MdDialog>
  </div>
</template>

<script>
import { materialDate } from '@/assets/js/helper'
export default {
  name: 'IndividualEntry',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    inputs: {},
    errors: {},
    loading: false,
    windowWidth: null,
    baseUrl: process.env.baseUrl,
    apiUrl: process.env.apiUrl
  }),
  computed: {
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
    open(item) {
      this.inputs = JSON.parse(JSON.stringify(item))
      this.$emit('update:show', true)
    },
    onClosing() {
      this.inputs = {}
      this.resetErrors()
    },
    convertDate(date) {
      return materialDate(date, false, 'YYYY-MM-DD')
    },
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
        if (this.inputs.id) {
          await this.$store.dispatch('forms/update', this.inputs)
        } else {
          await this.$axios.$post('forms', this.inputs)
        }
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
    }
  }
}
</script>
