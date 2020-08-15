const app = Vue.createApp({
    data() {
        return {
            uBikeStops: [],
            pageSize: 10,
            pageIndex: 1,
            totalPages: 0,
            pageRange: 5,
            pageNumbers: [],
            searchName: '',
            currentSort: '',
            isSortDesc: true,
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
            this.gotoPage(1);
        },
        pageIndex() {
            this.setPageNumbers();
        }
    },
    computed: {
        paginationItems() {
            const start = (this.pageIndex - 1) * this.pageSize;

            return this.sortedUBikeStops.slice(start, start + this.pageSize);
        },
        bempSortClass() {
            return this.currentSort === 'bemp' ? this.isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc' : 'fa-sort';
        },
        totSortClass() {
            return this.currentSort === 'tot' ? this.isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc' : 'fa-sort';
        },
        filterUBikeStops() {
            const stops = this.uBikeStops.filter(stop => stop.sna.includes(this.searchName));
            this.totalPages = Math.ceil(stops.length / this.pageSize);
            this.pageRange = this.totalPages < 5 ? this.totalPages : 5;
            this.pageNumbers = Array(this.pageRange).fill().map((_, i) => i + 1);

            return stops;
        },
        sortedUBikeStops() {
            const column = this.currentSort;

            return this.filterUBikeStops.sort((stop1, stop2) =>
                this.isSortDesc ? stop2[column] - stop1[column] : stop1[column] - stop2[column])
        }
    },
    methods: {
        timeFormat(val) {
            const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;

            return val.replace(pattern, '$1/$2/$3 $4:$5:$6')
        },
        gotoPage(index) {
            if (index > 0 && index <= this.totalPages) {
                this.pageIndex = index;
            }
        },
        setPageNumbers() {
            const start = {
                [this.pageNumbers[this.pageRange - 1]]: this.pageNumbers[0] + 1,
                [this.pageNumbers[0]]: this.pageNumbers[0] - 1,
                [1]: 1,
                [this.totalPages]: this.totalPages - this.pageRange + 1
            }[this.pageIndex];

            if (start) {
                this.pageNumbers = this.pageNumbers.map((_, i) => start + i);
            }
        },
        sort(column) {
            this.currentSort = column;
            this.isSortDesc = !this.isSortDesc;
        }
    }
}).mount('#app');
