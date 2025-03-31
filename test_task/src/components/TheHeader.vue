<script setup>
import { RouterLink } from 'vue-router';
import IconMainLogo from '@/assets/icons/icon-main-logo.svg'
import TheContainer from './TheContainer.vue';
</script>

<template>
  <header class="header">
    <the-container>
      <div class="header__wrapper">
        <router-link class="header__link" tag="a" to="/">
          <IconMainLogo class="header__logo" />
        </router-link>
      </div>
    </the-container>
  </header>
</template>

<style lang="scss" scoped>
@use '../assets/styles/components/TheHeader.scss';
</style>