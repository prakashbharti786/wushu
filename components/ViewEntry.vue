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
          View User Details
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
        <div v-if="inputs.id" class="md-form">
          <div
            v-for="item in viewConfigList"
            :key="item.key"
            class="md-form__row"
          >
            <div class="md-form__item">
              <div class="md-typography-caption">
                {{ item.label }}
              </div>
              <div class="md-typography-body1">
                {{
                  item.key === 'dob'
                    ? convertDate(inputs[item.key])
                    : inputs[item.key]
                }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="md-flex-grow-1"></div>
        <MdButton class="md-ml-1" data-md-dialog-action="close">
          Close
        </MdButton>
      </template>
    </MdDialog>
  </div>
</template>

<script>
import { materialDate } from '@/assets/js/helper'
export default {
  name: 'ViewEntry',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    windowWidth: null,
    inputs: {},
    viewConfigList: [
      {
        label: 'Name',
        key: 'name'
      },
      {
        label: 'Father name',
        key: 'father_name'
      },
      {
        label: 'Mobile',
        key: 'mobile'
      },
      {
        label: 'DOB',
        key: 'dob'
      },
      {
        label: 'district',
        key: 'district'
      },
      {
        label: 'Aadhaar no',
        key: 'aadhaar_no'
      },
      {
        label: 'Event',
        key: 'event'
      },
      {
        label: 'Category',
        key: 'category'
      }
    ]
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
    window.removeEventListener('resize', this.changeWidth)
  },
  methods: {
    open(item) {
      this.inputs = JSON.parse(JSON.stringify(item))
      this.$emit('update:show', true)
    },
    convertDate(date) {
      return materialDate(date, false)
    },
    changeWidth() {
      this.windowWidth = window.innerWidth
    },
    handleAction(e) {
      if (e.action === 'close') {
        this.$emit('update:show', false)
      }
    }
  }
}
</script>
