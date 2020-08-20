<template>
  <table class="table table-hover table-striped">
    <thead>
    <tr>
      <th class="pointer" @click="sort('sno')">
        <span>#</span>
        <i v-show="currentSort === 'sno'" class="arrow fa"
           :class="[sortClass]"
           aria-hidden="true"></i>
      </th>
      <th>場站名稱</th>
      <th>場站區域</th>
      <th class="pointer" @click="sort('bemp')">
        <span>目前可用車輛</span>
        <i v-show="currentSort === 'bemp'" class="arrow fa"
           :class="[sortClass]"
           aria-hidden="true"></i>
      </th>
      <th class="pointer" @click="sort('tot')">
        <span>總停車格</span>
        <i v-show="currentSort === 'tot'" class="arrow fa"
           :class="[sortClass]"
           aria-hidden="true"></i>
      </th>
      <th>資料更新時間</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item of items" :key="item.sno">
      <td>{{ item.sno }}</td>
      <td>{{ item.sna }}</td>
      <td>{{ item.sarea }}</td>
      <td>{{ item.bemp }}</td>
      <td>{{ item.tot }}</td>
      <td>{{ timeFormat(item.mday) }}</td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    items: Array,
  },
  data() {
    return {
      currentSort: 'sno',
      isSortDesc: false
    }
  },
  computed: {
    sortClass() {
      return this.isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc';
    },
  },
  methods: {
    timeFormat(val) {
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;

      return val.replace(pattern, '$1/$2/$3 $4:$5:$6')
    },
    sort(column) {
      this.currentSort = column;
      this.isSortDesc = !this.isSortDesc;
      this.$emit('sort', {currentSort: column, isSortDesc: this.isSortDesc});
    }
  }
}
</script>
<style scoped>

.arrow {
  height: 0;
  padding: 2px;
}

.pointer {
  cursor: pointer;
}

</style>
