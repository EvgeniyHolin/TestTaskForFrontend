<script setup>
import { computed, onMounted, ref } from "vue";
import TheContainer from "../components/TheContainer.vue";
import IconCheck from "@/assets/icons/icon-check.svg";
import IconLoader from "@/assets/icons/icon-loader.svg";
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import { useCurrentMoviesStore } from "@/stores/MovieList";

const movies = useCurrentMoviesStore();
const filterByName = ref(false);
const filterByYear = ref(false);
const isLoading = ref(false);

const getMovies = async () => {
  isLoading.value = true;
  await axios.get('https://mashroom-movies-api.netlify.app/api/movies')
    .then(response => {
      movies.currentListMovie = response.data.data;
      isLoading.value = false;
    })
    .catch(error => {
      console.log(error.message);
      alert('Что-то пошло не так...');
    })
}

const toggleSort = (value) => {
  switch (value) {
    case 'name':
      filterByYear.value = false;
      break;
    case 'year':
      filterByName.value = false;
      break;
  }
}

const sortedMovies = computed(() => {
  const copyMovies = movies.currentListMovie.slice();
  if (filterByName.value) {
    copyMovies.sort((a, b) => a.title.localeCompare(b.title))
  }

  if(filterByYear.value) {
    copyMovies.sort((a, b) => a.year - b.year);
  }

  return copyMovies;
})

onMounted(getMovies);
</script>

<template>
  <main>
    <section class="movies">
      <the-container>
        <div class="movies__wrapper">
          <h1 class="visually-hidden">Агрегатор фильмов movienow</h1>
          <h2 class="movies__title">Фильмы</h2>
          <ul class="movies__filters">
            <li class="movies__filter">
              <input class="movies__input visually-hidden" type="checkbox" id="name" v-model="filterByName" @change="toggleSort('name')">
              <label class="movies__label" for="name">Отсортировать по названию</label>
              <IconCheck class="movies__check"/>
            </li>
            <li class="movies__filter">
              <input class="movies__input visually-hidden" type="checkbox" id="year" v-model="filterByYear" @change="toggleSort('year')">
              <label class="movies__label" for="year">Отсортировать по году</label>
              <IconCheck class="movies__check"/>
            </li>
          </ul>
        </div>

        <div class="movies__inner">
            <IconLoader class="movies__loader" v-if="isLoading"/>
            <ul class="movies__list" v-else>
              <li class="movies__item" v-for="movie in sortedMovies" :key="movie.id">
                <MovieCard :movie="movie"/>
              </li>
            </ul>
          </div>
      </the-container>
    </section>
  </main> 
</template>

<style lang="scss" scoped>
@use '../assets/styles/blocks/TheMovies.scss';
</style>