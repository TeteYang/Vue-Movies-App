<template>
  <div>
    <b-pagination
      v-model="currentPageModel"
      :total-rows="total"
      :per-page="perPage"
      prev-text="Prev"
      next-text="Next"
    >
    {{ currentPage }}
    </b-pagination>
  </div>
</template>

<script>
export default {
  name: 'MoviesPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 1
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit('pageChanged', value);
      }
    }
  }
}
</script>

<style scoped>
  .pagination {
    margin: 0;
    padding: 5px 0 15px 0;
    display: flex;
    justify-content: center;
  }
  .pagination >>> .page-item .page-link {
    background-color: transparent;
    font-size: 15px;
    color: white;
    box-shadow: none;
  }
  .pagination >>> .page-item.active .page-link {
    border-color: white;
    background-color: white;
    color: black;
  }
</style>
