<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" @click.prevent="gotoFirstPage()">
        <a class="page-link" href="#">&laquo;</a>
      </li>
      <li class="page-item" @click.prevent="gotoPage(pageIndex - 1)">
        <a class="page-link" href="#">‹</a>
      </li>
      <li class="page-item" v-for="num of pageNumbers" :class="{active : pageIndex === num}" :key="num"
          @click.prevent="gotoPage(num)">
        <a class="page-link" href="#">{{ num }}</a>
      </li>
      <li class="page-item" @click.prevent="gotoPage(pageIndex + 1)">
        <a class="page-link" href="#">›</a>
      </li>
      <li class="page-item" @click.prevent="gotoLastPage()">
        <a class="page-link" href="#">&raquo;</a>
      </li>
    </ul>
  </nav>
</template>
<script>
const NORMAL_PAGES_RANGE = 5;
export default {
  props: {
    currentPage: Number,
    totalPages: Number
  },
  data() {
    return {
      pageNumbers: [],
      paginationRange: 0,
      pageIndex: this.currentPage
    }
  },
  watch: {
    totalPages() {
      this.paginationRange = this.totalPages < NORMAL_PAGES_RANGE ? this.totalPages : NORMAL_PAGES_RANGE;
      this.pageNumbers = Array(this.paginationRange).fill().map((_, i) => i + 1);
    },
    pageIndex(val) {
      this.setPageNumbers();
      this.$emit('update:currentPage', val);
    }
  },
  methods: {
    gotoPage(num) {
      if (num > 0 && num <= this.totalPages) {
        this.pageIndex = num;
      }
    },
    gotoFirstPage() {
      this.pageIndex = 1;
    },
    gotoLastPage() {
      this.pageIndex = this.totalPages;
    },
    setPageNumbers() {
      const start = {
        [this.pageNumbers[this.paginationRange - 1]]: this.pageNumbers[0] + 1,
        [this.pageNumbers[0]]: this.pageNumbers[0] - 1,
        [1]: 1,
        [this.totalPages]: this.totalPages - this.paginationRange + 1
      }[this.pageIndex];
      if (start) {
        this.pageNumbers = this.pageNumbers.map((_, i) => start + i);
      }
    }
  }
}
</script>
<style scoped>

</style>
