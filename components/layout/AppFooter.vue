<template>
  <footer class="md-footer">
    <div class="md-border" />
    <div class="md-footer__section md-pt-3">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div class="md-col md-col--12 md-col--3-md">
            <div class="md-footer__drop-down-section">
              <h1 class="md-footer__heading md-typography-subhead">
                Information
              </h1>
              <div class="md-footer__link-list">
                <nuxt-link to="/" class="md-footer__link md-typography-body-1"
                  >Home
                </nuxt-link>
                <nuxt-link
                  to="/services"
                  class="md-footer__link md-typography-body-1"
                  >Services
                </nuxt-link>
                <nuxt-link
                  to="/about"
                  class="md-footer__link md-typography-body-1"
                  >About us
                </nuxt-link>
                <nuxt-link
                  to="/contact"
                  class="md-footer__link md-typography-body-1"
                  >Contact us
                </nuxt-link>
              </div>
            </div>
          </div>
          <div v-if="true" class="md-col md-col--3-md">
            <div class="md-footer__drop-down-section">
              <h1 class="md-footer__heading md-typography-subhead">Socials</h1>
              <div class="md-footer__link-list">
                <a class="md-footer__link md-typography-body-1" href="#"
                  >Instagram</a
                >
                <a class="md-footer__link md-typography-body-1" href="#"
                  >Twitter</a
                >
                <a class="md-footer__link md-typography-body-1" href="#"
                  >Facebook</a
                >
                <a class="md-footer__link md-typography-body-1" href="#"
                  >Pinterest</a
                >
              </div>
            </div>
          </div>
          <div class="md-col md-col--12 md-col--6-md">
            <div class="md-footer__drop-down-section">
              <div class="md-footer__heading md-footer__brand">
                <img
                  class=""
                  style="height: 32px;max-height: none;margin-top: -10px"
                  src="https://firebasestorage.googleapis.com/v0/b/freekaadeal-e6a92.appspot.com/o/images%2Ftaxedwiser-logo-blue.png?alt=media&token=8b9002d6-a2bf-4c80-baa8-d845b48df4e8"
                />
              </div>
              <div
                style="color: var(--color-app-text-secondary);"
                class="md-typography-body-1"
              >
                Bringing together the needs of taxpayers to file tax returns and
                the expertise of Chartered Accountants and Tax Preparers in
                filing tax returns over an electronic system.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-footer__section--utility md-footer__section md-pt-2 md-pb-2">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-col--12 md-layout md-align md-align--start-center"
          >
            <div
              style="color: var(--color-app-text-secondary);"
              class="md-typography-body-1"
            >
              © 2018 taxedwiser.com - All rights reserved.
            </div>
            <div class="md-flex-grow-1" />
            <div class="md-footer__link-list--row md-footer__link-list">
              <nuxt-link
                to="/privacy"
                class="md-footer__link md-typography-caption"
                >Privacy policy
              </nuxt-link>
              <nuxt-link
                to="/terms"
                class="md-footer__link md-typography-caption"
                >Terms & conditions
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
