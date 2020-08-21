<template>
  <p>
    站點名稱搜尋: <input type="text" @keypress.enter="$emit('update:name', $event.target.value)">
  </p>
</template>
