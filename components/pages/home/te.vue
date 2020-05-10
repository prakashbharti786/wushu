<template>
  <div class="">
    <MdDialog
      :title="item.name"
      :show="show"
      :close-on-button-click="false"
      class="md-dialog--full-screen md-dialog--scrollable"
      @update:show="$emit('update:show', $event)"
      @MDDialog:action="handleAction"
    >
      <template slot="header">
        <div class="md-dialog__header-action-dismissive">
          <MdIconButton data-md-dialog-action="close" icon="close" />
        </div>
        <div class="md-dialog__header-title">Edit {{ item.name }} form</div>
        <div class="md-dialog__header-action-affirmative">
          <MdButton :outlined="true">
            <span class="md-button__label">Save Changes</span>
          </MdButton>
        </div>
      </template>
      <template>
        <div class="md-panel form-panel md-mb-1">
          <div class="md-panel__body md-px-1 md-px-2-sm">
            <form
              class="md-row"
              method="post"
              action=""
              @submit.prevent="onSubmit"
            >
              <div class="md-col md-col--12 md-col--6-sm">
                <div class="md-form">
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
                      ref="email"
                      class="md-flex--grow"
                      :required="true"
                      :value="inputs.email"
                      :error-text="errors.email"
                      :invalid="!!errors.email"
                      :maxlength="50"
                      type="email"
                      uid="email"
                      label="Email"
                      name="email"
                      @input="onInput($event, 'email')"
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
                      ref="school"
                      class="md-flex--grow"
                      :required="true"
                      :value="inputs.school"
                      :error-text="errors.school"
                      :invalid="!!errors.school"
                      :maxlength="50"
                      uid="school"
                      label="School name"
                      name="school"
                      @input="onInput($event, 'school')"
                    />
                  </div>
                  <div class="md-form__row">
                    <MdTextField
                      ref="parent_profession"
                      class="md-flex--grow"
                      :required="true"
                      :value="inputs.parent_profession"
                      :error-text="errors.parent_profession"
                      :invalid="!!errors.parent_profession"
                      :maxlength="50"
                      uid="parent_profession"
                      label="Parent profession"
                      name="parent_profession"
                      @input="onInput($event, 'parent_profession')"
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
                      class="md-flex--grow"
                      :required="true"
                      :value="inputs.address"
                      :error-text="errors.address"
                      :invalid="!!errors.address"
                      :minlength="6"
                      :maxlength="50"
                      :row="2"
                      type="textarea"
                      uid="address"
                      label="Address"
                      name="address"
                      @input="onInput($event, 'address')"
                    />
                  </div>
                </div>
              </div>
              <div class="md-col md-col--12 md-col--6-sm">
                <div class="md-form">
                  <div class="md-form__row">
                    <div class="md-form__item">
                      <div class="md-d-flex md-align-items-center">
                        <span>Gender</span>
                      </div>
                    </div>
                  </div>
                  <div class="md-form__row">
                    <MdRadio
                      v-model="inputs.gender"
                      style="min-width:100px"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="gender"
                      uid="radio-2"
                      value="male"
                      :required="true"
                    >
                      Male
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.gender"
                      style="min-width:100px"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="gender"
                      uid="radio-1"
                      value="female"
                      :required="true"
                    >
                      Female
                    </MdRadio>
                  </div>
                  <div class="md-form__row">
                    <div class="md-form__item">
                      <div class="md-d-flex md-align-items-center">
                        <span>Applying for</span>
                      </div>
                    </div>
                  </div>
                  <div class="md-form__row">
                    <MdRadio
                      v-model="inputs.applying_for"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="applying_for"
                      uid="applying_for-1"
                      value="9"
                    >
                      9
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.applying_for"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="applying_for"
                      uid="applying_for-2"
                      value="10"
                      :required="true"
                    >
                      10
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.applying_for"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="applying_for"
                      uid="applying_for-3"
                      value="11"
                      :required="true"
                    >
                      11
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.applying_for"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="applying_for"
                      uid="applying_for-4"
                      value="12"
                      :required="true"
                    >
                      12
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.applying_for"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="applying_for"
                      uid="applying_for-5"
                      value="competition"
                      :required="true"
                    >
                      Competition
                    </MdRadio>
                  </div>
                  <div class="md-form__row">
                    <div class="md-form__item">
                      <div class="md-d-flex md-align-items-center">
                        <span>Category</span>
                      </div>
                    </div>
                  </div>
                  <div class="md-form__row">
                    <MdRadio
                      v-model="inputs.category"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="category"
                      uid="category-1"
                      value="general"
                      :required="true"
                    >
                      General
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.category"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="category"
                      uid="category-2"
                      value="obc"
                      :required="true"
                    >
                      OBC
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.category"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="category"
                      uid="category-3"
                      value="sc-st"
                      :required="true"
                    >
                      SC/ST
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.category"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="category"
                      uid="category-4"
                      value="other"
                      :required="true"
                    >
                      Other
                    </MdRadio>
                  </div>
                  <div class="md-form__row">
                    <div class="md-form__item">
                      <div class="md-d-flex md-align-items-center">
                        <span>Medium</span>
                      </div>
                    </div>
                  </div>
                  <div class="md-form__row">
                    <MdRadio
                      v-model="inputs.medium"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="medium"
                      uid="medium-1"
                      value="hindi"
                    >
                      Hindi
                    </MdRadio>
                    <MdRadio
                      v-model="inputs.medium"
                      style="min-width:0"
                      class="md-align-items-center md-d-inline-flex md-flex-grow-0"
                      theme="primary"
                      name="medium"
                      uid="medium-2"
                      value="english"
                    >
                      English
                    </MdRadio>
                  </div>
                </div>
              </div>
              <input type="reset" class="no-render no-render--reset" />
              <input type="submit" class="no-render no-render--submit" />
            </form>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="md-flex-grow-1"></div>
        <MdButton class="md-ml-1" data-md-dialog-action="close">
          Cancel
        </MdButton>
        <MdButton
          class="md-ml-1"
          :outlined="true"
          data-md-dialog-action="accept"
        >
          Save Changes
        </MdButton>
      </template>
    </MdDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { materialDate } from '@/assets/js/commonHelper'

export default {
  middleware: 'auth',
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    baseUrl: process.env.baseUrl,
    isChanges: true,
    show: true,
    loading: false,
    inputs: {
      name: '',
      father_name: '',
      email: '',
      mobile: '',
      dob: '',
      school: '',
      parent_profession: '',
      address: '',
      aadhaar_no: '',
      gender: '',
      applying_for: '',
      category: '',
      medium: '',
      picture: ''
    },
    errors: {}
  }),
  computed: {
    ...mapGetters({
      itemList: 'forms/getData'
    }),
    item() {
      return this.itemList.find((item) => {
        // eslint-disable-next-line eqeqeq
        return this.$route.params.id == item.id
      })
    }
  },
  async fetch({ store, error, params }) {
    if (process.client) {
      const item_ = store.state.forms.data.find(function(item) {
        // eslint-disable-next-line eqeqeq
        return params.id == item.id
      })
      if (item_) {
        return
      }
    }
    try {
      await store.dispatch('forms/show', { id: params.id })
    } catch (e) {
      return error({ statusCode: 404, message: 'Not found' })
    }
  },
  mounted() {
    this.$store.commit('core/setData', {
      name: 'topAppBarTitle',
      data: 'Our blog'
    })
    setTimeout(() => {
      this.refreshData()
    }, 300)
  },
  beforeDestroy() {
    this.show = false
    this.$store.commit('core/setAppLoading', false)
  },
  methods: {
    convertDate(date) {
      return materialDate(date, false, 'YYYY-MM-DD')
    },
    refreshData() {
      Object.keys(this.item).forEach((key) => {
        this.$set(this.inputs, key, this.item[key])
      })
    },
    onInput(val, key) {
      this.$set(this.inputs, key, val)
      if (!this.isChanges) {
        this.isChanges = true
      }
    },
    handleAction(e) {
      if (e.action === 'close') {
        this.show = false
        setTimeout(() => {
          this.$router.push('/admin/forms')
        }, 300)
      } else {
        this.onSubmitClick()
      }
    },
    onSubmitClick() {
      document.querySelector('.no-render--submit').click()
    },
    onSubmit() {
      if (this.isChanges) {
        this.updateData()
      } else {
        this.handleAction({ action: 'close' })
      }
    },
    resetErrors() {
      this.errors = {}
    },
    async updateData() {
      this.resetErrors()
      if (this.loading) {
        return false
      }
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$store.dispatch('forms/update', this.inputs)
        this.loading = false
        this.$store.commit('core/setAppLoading', false)
        this.show = false
        setTimeout(() => {
          this.goBack()
        }, 300)
      } catch (e) {
        this.handleError(e)
        alert('Something went wrong. Try again!')
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },
    handleError(errorResponse) {
      // eslint-disable-next-line no-console
      console.log(errorResponse)
      if (errorResponse && errorResponse.status === 400) {
        const errors = errorResponse.data
        errors.forEach((item) => {
          this.errors[item.field] = item.message
          this.$refs[item.field].$el
            .querySelector('.md-text-field__input')
            .focus()
        })
      }
    },
    goBack() {
      const history = this.$store.state.core.history
      if (history.length > 1) {
        const lastHistoryToPush = history[history.length - 2]
        this.$store.commit('core/popData', 'history')
        this.$router.push(lastHistoryToPush)
      } else {
        // push to home
        this.$router.push('/')
      }
    }
  }
}
</script>
