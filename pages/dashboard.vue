<template>
  <div class="rx-section">
    <div
      class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
    >
      <div class="md-row">
        <div class="md-col md-col--12">
          <div class="md-panel cp-animate cp-animate--fade-up">
            <header class="md-panel__header md-border-bottom">
              <div class="md-top-app-bar__title md-pl-1 md-d-none md-d-flex-sm">
                User List
              </div>
              <div class="md-flex-grow-1"></div>
              <MdButton label="Download CSV" @click="onCSVDownload" />
            </header>
            <div
              style="overflow-x: auto;width: 100%;"
              class="md-panel__body md-pt-0"
            >
              <table
                class="md-table md-table--no-border md-table--gray"
                style="box-shadow: none;"
              >
                <thead>
                  <tr class="md-table-row md-table-row--header">
                    <th class="md-table-row__cell">Name</th>
                    <th class="md-table-row__cell md-d-block-sm md-d-none">
                      Mobile
                    </th>
                    <th class="md-d-block-sm md-d-none md-table-row__cell">
                      District
                    </th>
                    <th class="md-table__cell--number md-table-row__cell">
                      <div class="text-right">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in itemList"
                    :key="item.id"
                    class="md-table-row"
                  >
                    <td class="md-table-row__cell">
                      <div class="md-table__cell-wrapper">
                        {{ item.name }}
                      </div>
                    </td>
                    <td class="md-table-row__cell md-d-block-sm md-d-none">
                      <div class="md-table__cell-wrapper">
                        {{ item.mobile }}
                      </div>
                    </td>
                    <td class="md-table-row__cell md-d-block-sm md-d-none">
                      <div class="md-table__cell-wrapper">
                        {{ item.district }}
                      </div>
                    </td>
                    <td class="md-table-row__cell">
                      <div class="">
                        <MdIconButton
                          title="Preview"
                          icon="visibility"
                          class="md-icon-button"
                          @click="viewItem(item)"
                        >
                        </MdIconButton>
                        <MdIconButton
                          title="Edit"
                          icon="edit"
                          class="md-icon-button"
                          @click="updateItem(item)"
                        >
                        </MdIconButton>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <footer class="md-panel__footer">
              <pagination
                :per-page="pagination.perPage"
                :page="pagination.page"
                :total="parseInt(getPagination.total)"
                @pageChanged="onPageChanged"
              />
            </footer>
          </div>
        </div>
      </div>
    </div>
    <IndividualEntry
      ref="individualEntry"
      :show.sync="individualEntryDialogToggle"
    />
    <ViewEntry ref="viewEntry" :show.sync="viewEntryDialogToggle" />
  </div>
</template>

<style>
.md-table-row--header .md-table-row__cell {
  font-weight: 700;
}
</style>

<script>
import { mapGetters } from 'vuex'
import IndividualEntry from '@/components/IndividualEntry'
import ViewEntry from '@/components/ViewEntry'
import Pagination from '@/components/common/Pagination'

export default {
  components: { Pagination, ViewEntry, IndividualEntry },
  middleware: 'auth',
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    individualEntryDialogToggle: false,
    viewEntryDialogToggle: false,
    isFetching: true,
    pagination: {
      page: 1,
      perPage: 10
    }
  }),
  computed: {
    ...mapGetters({
      itemList: 'forms/getData',
      getPagination: 'forms/getPagination'
    }),
    enableList() {
      return this.itemList.length
    }
  },
  mounted() {
    this.fetchForms(this.pagination)
    this.$store.commit('core/setData', {
      name: 'topAppBarTitle',
      data: 'Our blog'
    })
  },
  beforeDestroy() {
    this.$store.commit('core/setAppLoading', false)
  },
  methods: {
    async onCSVDownload() {
      const { data } = await this.$axios.get(`forms/getreports`)
      const dlink = document.createElement('a')
      dlink.download = 'data.csv'
      dlink.target = '_blank'
      dlink.href = data
      dlink.click()
      dlink.remove()
    },
    onPageChanged(page) {
      this.pagination.page = page
      this.fetchForms(this.pagination)
    },
    async fetchForms(pagination) {
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$store.dispatch('forms/index', pagination)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.$store.commit('core/setAppLoading', false)
    },
    updateItem(item) {
      this.$refs.individualEntry.open(item)
    },
    viewItem(item) {
      this.$refs.viewEntry.open(item)
    }
  }
}
</script>
