<template>
  <div class="md-row">
    <div class="md-col md-col--12 md-col--6-md">
      <div class="md-card">
        <div class="md-card__primary-action">
          <section class="md-card__primary">
            <div class="md-card__title-text">
              <span class="md-typography-headline6 md-typography-headline5-md">
                Team entry
              </span>
            </div>
          </section>
          <section class="md-card__supporting-text">
            <div class="md-typography-subtitle1 md-d-flex">
              <span><i class="material-icons">group</i></span>
              <span class="md-ml-1">Applicable to groups</span>
            </div>
          </section>
        </div>
        <section class="md-card__actions">
          <div class="md-card__action-icons"></div>
          <div class="md-card__action-buttons">
            <button
              class="md-button md-button--raised md-mr-1 md-mb-1 md-button--primary md-button--unelevated md-card__action"
              @click="$emit('makeEntry', 'teamEntryDialogToggle')"
            >
              Submit Team Entry
            </button>
          </div>
        </section>
      </div>
    </div>
    <div class="md-col md-mt-3 md-mt-0-md md-col--12 md-col--6-md">
      <div class="md-card">
        <div class="md-card__primary-action">
          <section class="md-card__primary">
            <div class="md-card__title-text">
              <span class="md-typography-headline6 md-typography-headline5-md">
                Individual entry
              </span>
            </div>
          </section>
          <section class="md-card__supporting-text">
            <div class="md-typography-subtitle1 md-d-flex">
              <span><i class="material-icons">person</i></span>
              <span class="md-ml-1">Applicable to Individual</span>
            </div>
          </section>
        </div>
        <section class="md-card__actions">
          <div class="md-card__action-icons"></div>
          <div class="md-card__action-buttons">
            <button
              class="md-button md-button--raised md-mr-1 md-mb-1 md-button--primary md-button--unelevated md-card__action"
              @click="$emit('makeEntry', 'individualEntryDialogToggle')"
            >
              Submit Individual Entry
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
