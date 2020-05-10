<template>
  <div class="">
    <div class="md-list">
      <div
        v-for="(item, index) in notifications"
        :key="index"
        class="md-list-item"
      >
        <div class="md-list-graphic md-list-graphic--avatar md-bg-primary">
          {{ index + 1 }}
        </div>
        <div class="md-list-content">
          <div class="md-list-content__title">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Notification',
  data: () => ({
    notifications: [
      {
        name:
          'All category (sub-junior/junior/senior) Taolu events should be performed within 30 sec.'
      },
      {
        name: 'There is no degree of difficulty included in Taolu events.'
      },
      {
        name: 'Taolu uniform is must during the performance of event.'
      },
      {
        name: 'Taichiquan, Taichijian (All category Sub-Jr to Senior)'
      },
      {
        name:
          'Athlete must show their name and event name on the paper before starting the event.'
      },
      {
        name:
          'Only bare hand and short weapons event allowed in this championship.'
      },
      {
        name:
          'Athlete should have enough space here he/she can perform event smoothly.'
      }
    ]
  })
}
</script>
