<template>
  <p>
    站點名稱搜尋: <input type="text" :value="name" @keypress.enter="$emit('update:name', $event.target.value)">
  </p>
</template>
<script>
export default {
  props: {
    name: String
  }
}
</script>
<style scoped>
</style>
