<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-8">
    <MealItem v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
  </div>
  <div v-if="!meals.length" class="flex justify-center text-gray-600 p-8">
    Click a letter above to see meals that start with that letter. If none appear, try another letter!
  </div>
</template>

<script setup>
import MealItem from './MealItem.vue';

const { meals } = defineProps({
  meals: {
    required: true,
    type: Array,
  }
})

</script>
