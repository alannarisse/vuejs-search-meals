<template>
  <div class="max-w-full mx-2 p-8 grid grid-cols-1 min-[1280px]:grid-cols-2 gap-8 items-start">
    <div class="min-w-0">
      <h1 class="text-4xl font-bold mb-5 text-yellow-500">{{ meal.strMeal }}</h1>
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="max-w-full h-auto">
      <ul class="flex flex-wrap gap-3 mt-4" aria-label="Recipe ingredients">
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="w-20 text-center">
          <img
            :src="ingredient.image"
            :alt="ingredient.name"
            width="64"
            height="64"
            loading="lazy"
            class="w-16 h-16 mx-auto object-contain"
          >
          <span class="block text-sm mt-1 break-words">{{ ingredient.name }}</span>
        </li>
      </ul>
    </div>
    <div class="min-w-0">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-lg py-2 mt-8">
      <div>
        <strong class="font-bold">Category:</strong> {{ meal.strCategory }}
      </div>
      <div>
        <strong class="font-bold">Area:</strong> {{ meal.strArea }}
      </div>
      <div>
        <strong class="font-bold">Tags:</strong> {{ meal.strTags }}
      </div>
    </div>

    <div class="my-3 whitespace-pre-line">
      {{ meal.strInstructions }}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul>
          <template v-for="(el, ind) of new Array(20)">
            <li v-if="meal[`strIngredient${ind + 1}`]">
            {{ ind + 1 }}. {{ meal[`strIngredient${ind + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2">Measures</h2>
        <ul>
          <template v-for="(el, ind) of new Array(20)">
            <li v-if="meal[`strMeasure${ind + 1}`] && meal[`strMeasure${ind + 1}`].trim() !== ''">
            {{ ind + 1 }}. {{ meal[`strMeasure${ind + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
      
    </div>
<div class="mt-4">
        <YouTubeButton :href="meal.strYoutube" />
        <a
          :href="meal.strSource"
          target="_blank"
          class="ml-3 px-3 py-2 border-2 text-white border-yellow-600 bg-yellow-500 hover:bg-yellow-600 transition-colors"
        >
          View Original Source
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import axiosClient from '../axiosClient';
import YouTubeButton from '../components/YouTubeButton.vue';

const route = useRoute();
const meal = ref({})
const ingredients = computed(() =>
  Array.from({ length: 20 }, (_, index) => {
    const name = meal.value[`strIngredient${index + 1}`]?.trim();
    return name ? {
      id: index + 1,
      name,
      image: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '_'))}.png/small`
    } : null;
  }).filter(Boolean)
)

onMounted(() => {
  axiosClient.get(`lookup.php?i=${route.params.id}`)
    .then(({ data }) => {
      meal.value = data.meals[0] || {}
    })
})

</script>
