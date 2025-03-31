<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <div class="app__wrapper">
    <TheHeader />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
