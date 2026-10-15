<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-8">
    <MealItem v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
  </div>
  <div v-if="!meals.length" class="flex justify-center text-gray-600 p-8">
    {{ emptyMessage }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MealItem from './MealItem.vue';

const route = useRoute();
const emptyMessages = {
  byName: 'Type in a name and click Enter/Return to see related meals. If none appear, try another name or simplify your search terms.',
  byLetter: 'Click a letter above to see meals that start with that letter. If none appear, try another letter!',
  byIngredient: 'No meals found for this ingredient. Try another ingredient.',
  favorites: 'No favorites yet. Click the heart on a meal to save it here.',
};
const emptyMessage = computed(() => emptyMessages[route.name] || 'No meals to display yet. Try searching for a meal.');

const { meals } = defineProps({
  meals: {
    required: true,
    type: Array,
  }
})

</script>
