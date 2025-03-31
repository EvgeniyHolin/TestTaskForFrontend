<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import axios from 'axios';
import MovieCard from '@/components/MovieCard.vue';
import TheContainer from '@/components/TheContainer.vue';
import IconPrev from '@/assets/icons/icon-prev.svg';
import IconLoader from "@/assets/icons/icon-loader.svg";
import { useCurrentMoviesStore } from '@/stores/MovieList';

const route = useRoute();
const id = route.params.id;
const movieList = useCurrentMoviesStore();
const movie = ref({});
const isLoading = ref(false);

const getMovie = async () => {
  isLoading.value = true;
  await axios.get(`https://mashroom-movies-api.netlify.app/api/movie/${id}`)
    .then(respons => {
      movie.value = respons.data.data;
      isLoading.value = false;
    })
    .catch(error => {
      console.log(error.message);
      alert('Что-то пошло не так...');
    })
}

onMounted(() => {
  if (movieList.currentListMovie.length > 0) {
    movie.value = movieList.currentListMovie.find(movie => movie.id == id)
  } else {
    getMovie();
  }
});
</script>

<template>
  <main>
    <section class="movie">
      <the-container>
        <div class="movie__wrapper">
          <router-link class="movie__link" tag="a" to="/">
              <IconPrev class="movie__link-icon"/>
              <span class="movie__link-text">Назад к&nbsp;списку</span>
          </router-link>
        </div>

        <IconLoader class="movie__loader" v-if="isLoading"/>
        <div class="movie__inner" v-else>
          <span class="movie__empty" v-if="!movie">К&nbsp;сожалению, по&nbsp;вашему запросу ничего не&nbsp;найдено...</span>
          <MovieCard v-else :movie="movie"/>
        </div>
      </the-container>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use '../assets/styles/blocks/TheMovie.scss';
</style>