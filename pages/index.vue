<template>
  <div>
    <LandingBanner />
    <section id="event" class="rx-section md-bg-white md-pt-4">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div class="md-col md-mb-2">
            <h2
              class="md-mb-2 pm-work-font md-typography-headline4-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Events
              </span>
            </h2>
          </div>
        </div>
        <Event />
      </div>
    </section>
    <section id="entry" class="rx-section md-bg-white">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div class="md-col md-mb-2">
            <h2
              class="md-mb-2 pm-work-font md-typography-headline4-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Submit entry
              </span>
            </h2>
          </div>
        </div>
        <Entry @makeEntry="onEntryClicked" />
      </div>
    </section>
    <section class="rx-section md-bg-white">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div class="md-col md-mb-2">
            <h2
              class="md-mb-2 pm-work-font md-typography-headline4-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Rules &amp; regulations
              </span>
            </h2>
          </div>
        </div>
        <Notification />
      </div>
    </section>
    <section class="rx-section md-bg-white">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div class="md-col md-mb-2">
            <h2
              class="md-mb-2 pm-work-font md-typography-headline4-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Our Members
              </span>
            </h2>
          </div>
        </div>
        <Slider />
      </div>
    </section>
    <AuthSignin :show.sync="signInDialogToggle" />
    <IndividualEntry :show.sync="individualEntryDialogToggle" />
    <TeamEntry :show.sync="teamEntryDialogToggle" />
  </div>
</template>

<script>
import LandingBanner from '../components/pages/home/LandingBanner'
import Notification from '../components/pages/home/Notification'
import Event from '../components/pages/home/Event'
import Entry from '../components/pages/home/Entry'
import Slider from '../components/pages/home/Slider'
import AuthSignin from '@/components/AuthSignin'
import { EventBus } from '@/mixins/event-bus'
import TeamEntry from '@/components/TeamEntry'
import IndividualEntry from '@/components/IndividualEntry'

export default {
  components: {
    Notification,
    IndividualEntry,
    TeamEntry,
    AuthSignin,
    LandingBanner,
    Event,
    Entry,
    Slider
  },
  data: () => ({
    signInDialogToggle: false,
    individualEntryDialogToggle: false,
    teamEntryDialogToggle: false
  }),
  mounted() {
    EventBus.$on('onLoginButtonClicked', this.onLoginListen)
  },
  beforeDestroy() {
    EventBus.$off('onLoginButtonClicked', () => {})
  },
  methods: {
    onEntryClicked(e) {
      this[e] = true
    },
    onLoginListen() {
      this.signInDialogToggle = true
    }
  }
}
</script>
