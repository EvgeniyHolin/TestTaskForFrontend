<script setup>
import { RouterLink } from 'vue-router';
import IconTiming from '@/assets/icons/icon-timing.svg';

const props = defineProps({
  movie: {
    type: Object
  }
})

const formatField = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return '';
  }

  if (arr.length > 1) {
    return arr.join(', ');
  }

  return arr.join('');
}
</script>

<template>
  <div class="movie-card">
    <picture class="movie-card__image">
      <img class="movie-card__img" :src="movie.poster" alt="Постер фильма" loading="lazy">
    </picture>
    <div class="movie-card__wrapper">
      <router-link class="movie-card__link" tag="a" :to='`/movie/${movie.id}`'>
        <h3 class="movie-card__title">
          {{ movie.title }}
        </h3>
      </router-link>
      <span class="movie-card__info">{{ movie.year }}, {{ formatField(movie.genres) }}</span>
      <span class="movie-card__director">Режиссёр: {{ formatField(movie.directors) }}</span>
      <p class="movie-card__actors">
        <span class="movie-card__actors-label">Актёры:</span>
        <span class="movie-card__actors-list">{{ formatField(movie.actors) }}</span>
      </p>
      <p class="movie-card__descr" v-if="movie.description">{{ movie.description }}</p>
    </div>

    <div class="movie-card__timing" v-if="movie?.collapse?.duration">
      <span class="movie-card__duration">{{ formatField(movie.collapse.duration) }}</span>
      <IconTiming class="movie-card__icon" />
    </div>
  </div>
</template> 

<style lang="scss" scoped>
@use '../assets/styles/components/MovieCard.scss';
</style>