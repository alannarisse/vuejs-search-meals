<template>
  <div
    class=" bg-white rounded-tr-3xl drop-shadow-md m-4  hover:scale-105 transition-all"
  >
    <div class="relative">
    <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
      <img
        :src="meal.strMealThumb ? `${meal.strMealThumb}/small` : undefined"
        :alt="meal.strMeal"
        class="w-full h-48 object-cover rounded-tr-3xl"
      />
    </router-link>
    <button
      type="button"
      class="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
      :aria-pressed="isFavorite"
      :aria-label="`${isFavorite ? 'Remove' : 'Save'} ${meal.strMeal} ${isFavorite ? 'from' : 'to'} favorites`"
      @click="toggleFavorite"
    >
      <img
        :src="`${assetBase}assets/heart-${isFavorite ? 'active' : 'inactive'}.svg`"
        alt=""
        aria-hidden="true"
        class="h-7 w-7 object-contain"
      >
    </button>
    </div>
    <div class="p-5 bg-white">
      <h3 class="font-bold">{{ meal.strMeal }}</h3>
      <p class="mb-4">
        {{ $filters.truncateWords(meal.strInstructions, 20) }}
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <YouTubeButton :href="meal.strYoutube" />
        <RecipeButton :to="{ name: 'mealDetails', params: { id: meal.idMeal } }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import YouTubeButton from './YouTubeButton.vue';
import RecipeButton from './RecipeButton.vue';
import { useFavorites } from '../composables/useFavorites';

const { meal } = defineProps({
  meal: {
    required: true,
    type: Object
  }
})

const assetBase = import.meta.env.BASE_URL;
const { isFavorite, toggleFavorite } = useFavorites(() => meal.idMeal);

</script>
