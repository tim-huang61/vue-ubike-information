const app = Vue.createApp({
  data() {
      return {
          uBikeStops: [],
          filterStops: [],
          pageSize: 10,
          pageIndex: 0,
          totalPages: 0,
          pageRange: 5,
          pageNumbers: [],
          bempSortClass: '',
          totSortClass: '',
          isBempAsc: true,
          isTotAsc: true,
          searchName: '',
      }
  },
  created() {
      fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
          .then(res => res.json())
          .then(json => {
              const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
              this.filterStops = this.uBikeStops = stops;
          });
  },
  watch: {
      searchName() {
          this.filterStops = this.uBikeStops.filter(stop => stop.sna.includes(this.searchName));
      },
      filterStops() {
          this.totalPages = Math.ceil(this.filterStops.length / this.pageSize);
          this.pageRange = this.totalPages < 5 ? this.totalPages : 5;
          this.pageNumbers = Array(this.pageRange).fill().map((_, i) => i + 1);
          this.gotoPage(1)
      },
      pageIndex() {
          this.setPageNumber();
      },
      isBempAsc() {
          this.totSortClass = 'fa-sort';
          this.bempSortClass = this.isBempAsc ? 'fa-sort-asc' : 'fa-sort-desc';
      },
      isTotAsc() {
          this.bempSortClass = 'fa-sort';
          this.totSortClass = this.isTotAsc ? 'fa-sort-asc' : 'fa-sort-desc';
      }
  },
  computed: {
      paginationItems() {
          const start = (this.pageIndex - 1) * this.pageSize;

          return this.filterStops.slice(start, start + this.pageSize);
      },
  },
  methods: {
      timeFormat(val) {
          const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;

          return val.replace(pattern, '$1/$2/$3 $4:$5:$6')
      },
      sortBikeStops(column, isAsc) {
          this.filterStops.sort((stop1, stop2) =>
              isAsc ? stop1[column] - stop2[column] : stop2[column] - stop1[column])
      },
      gotoPage(index) {
          if (index > 0 && index <= this.totalPages) {
              this.pageIndex = index;
          }
      },
      setPageNumber() {
          const start = {
              [this.pageNumbers[this.pageRange - 1]]: this.pageNumbers[0] + 1,
              [this.pageNumbers[0]]: this.pageNumbers[0] - 1,
              [1]: 1,
              [this.totalPages]: this.totalPages - this.pageRange + 1
          }[this.pageIndex];

          if (start) {
              this.pageNumbers = this.pageNumbers.map((_, i) => start + i);
          }
      }
  }
}).mount('#app');