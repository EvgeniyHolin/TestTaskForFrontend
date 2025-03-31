import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCurrentMoviesStore = defineStore('CurrentMovies', () => {
  const currentListMovie = ref([]);

  return { currentListMovie };
});
