<template>
  <Search v-model:name="searchName"/>
  <UbikeTable :items="paginationItems" @sort="onSortEvent"/>
  <Pagination ref="pagination"
              v-model:current-page="currentPage"
              :total-pages="totalPages"/>
</template>

<script>
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import UbikeTable from "@/components/UbikeTable";

const PAGE_SIZE = 10;

export default {
  components: {UbikeTable, Pagination, Search},
  data() {
    return {
      uBikeStops: [],
      currentPage: 1,
      searchName: '',
      currentSort: '',
      isSortDesc: false,
    }
  },
  created() {
    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then(res => res.json())
        .then(json => {
          const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
          this.uBikeStops = stops;
        });
  },
  watch: {
    searchName() {
      this.currentPage = 1;
    }
  },
  computed: {
    paginationItems() {
      const start = (this.currentPage - 1) * PAGE_SIZE;

      return this.sortedUBikeStops.slice(start, start + PAGE_SIZE);
    },
    totalPages() {
      return Math.ceil(this.filterUBikeStops.length / PAGE_SIZE)
    },
    filterUBikeStops() {
      return [...this.uBikeStops].filter(stop => stop.sna.includes(this.searchName));
    },
    sortedUBikeStops() {
      const column = this.currentSort;

      return [...this.filterUBikeStops].sort((stop1, stop2) =>
          this.isSortDesc ? stop2[column] - stop1[column] : stop1[column] - stop2[column])
    }
  },
  methods: {
    onSortEvent(obj) {
      this.currentSort = obj.currentSort;
      this.isSortDesc = obj.isSortDesc;
    }
  }
}
</script>

<style scoped>
</style>
