<template>
  <div class="pagination md-d-flex md-align-items-center">
    <div class="md-flex-grow-1"></div>
    <div class="pagination-item">
      <MdIconButton
        icon="chevron_left"
        :dense="true"
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      ></MdIconButton>
    </div>
    <div class="pagination-item">
      <MdIconButton
        icon="chevron_right"
        :disabled="isInLastPage"
        @click="onClickNextPage"
      ></MdIconButton>
    </div>
  </div>
</template>

<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return this.total && this.perPage
        ? Math.ceil(this.total / this.perPage)
        : 1
    },
    startPage() {
      // When on the first page
      if (this.page === 1) {
        return 1
      }
      // When on the last page
      if (this.page === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons
      }
      // When in between
      return this.page - 1
    },
    pages() {
      const range = []

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i += 1
      ) {
        range.push({
          name: i,
          isDisabled: i === this.page
        })
      }

      return range
    },
    isInFirstPage() {
      return this.page === 1
    },
    isInLastPage() {
      return this.page === this.totalPages
    }
  },
  methods: {
    isPageActive(page) {
      return this.page === page
    },
    onClickPreviousPage() {
      this.$emit('pageChanged', this.page - 1)
    },
    onClickNextPage() {
      this.$emit('pageChanged', this.page + 1)
    }
  }
}
</script>
