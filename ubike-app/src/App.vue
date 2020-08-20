<template>
  <h1>YouBike 臺北市公共自行車即時資訊</h1>
  <div id="app">
    <UbikeMainPage/>
  </div>
</template>

<script>
import UbikeMainPage from './components/UbikeMainPage.vue'

export default {
  components: {
    UbikeMainPage
  }
}
</script>

<style scoped>
body {
  padding: 1em;
}
</style>
