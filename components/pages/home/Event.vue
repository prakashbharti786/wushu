<template>
  <div class="md-row">
    <div class="md-col md-col--12 md-mb-3">
      <div
        class="md-banner md-bg-warning md-banner--vertical"
        style="border-radius: 4px"
      >
        <div class="md-banner__body">
          <span class="md-banner__icon md-text-warning">
            <i class="material-icons">lock_open</i>
          </span>
          You're required to enter password in order to join the meeting. Enter
          the following password: &quot;biharwushu&quot;
        </div>
        <section class="md-banner__actions">
          <button
            class="md-button md-button--compact"
            @click="copyToClipboard('biharwushu')"
          >
            {{ copied ? 'Copied' : 'Copy Password' }}
          </button>
        </section>
      </div>
    </div>
    <div
      class="md-col md-col--12 md-col--6-md md-mb-4"
      v-for="(event, index) in events"
      :key="index"
    >
      <div class="md-card event-card">
        <div class="md-card__primary-action">
          <section class="md-card__primary">
            <div class="md-card__title-text">
              <span class="md-typography-subtitle1 md-typography-headline6-md">
                {{ event.name }}
              </span>
            </div>
          </section>
          <section class="md-card__supporting-text">
            <div
              class="md-typography-body1 md-typography-subtitle1-md md-d-flex"
            >
              <span><i class="material-icons">schedule</i></span>
              <span class="md-ml-1">{{ event.time }}</span>
            </div>
          </section>
        </div>
        <section class="md-card__actions">
          <div class="md-card__action-icons">
            <div class="md-typography-subtitle1 md-d-flex md-ml-1">
              <span><i class="material-icons">event</i></span>
              <span class="md-ml-1">{{ event.date }}</span>
            </div>
          </div>
          <div class="md-card__action-buttons">
            <a
              href="https://us04web.zoom.us/j/78322752838?pwd=NW9JSG8wcWE5OUdvVUhZSjVWRzVzUT09"
              target="_blank"
              class="md-button md-button--raised md-mr-1 md-mb-1 md-button--primary md-button--unelevated md-card__action"
            >
              Join Zoom Meeting
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<style>
@media (min-width: 767px) {
  .event-card .md-card__primary-action {
    min-height: 137px;
  }
}
</style>
<script>
export default {
  data: () => ({
    events: [
      {
        time: '11:00 AM - 11:40 AM',
        date: '12 May, 2020',
        name: 'Opening Ceremony, Guest Speech'
      },
      {
        time: '1:30 PM - 2:10 PM',
        date: '12 May, 2020',
        name: 'Changquan, Daoshu, Jianshu (All category Sub-Jr to Senior)'
      },
      {
        time: '2:30 PM - 3:10 PM',
        date: '12 May, 2020',
        name: 'Nanquan, Nandao (All category Sub-Jr to Senior)'
      },
      {
        time: '3:30 PM - 4:10 PM',
        date: '12 May, 2020',
        name: 'Taichiquan, Taichijian (All category Sub-Jr to Senior)'
      },
      {
        time: '4:30 PM - 5:10 PM',
        date: '12 May, 2020',
        name: 'Other or Traditional events'
      },
      {
        time: '5:30 PM - 6:00 PM',
        date: '12 May, 2020',
        name: 'Closing Ceremony, Guest Speech'
      }
    ],
    copied: false
  }),
  methods: {
    copyToClipboard(str) {
      const el = document.createElement('textarea')
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 3000)
    }
  }
}
</script>
