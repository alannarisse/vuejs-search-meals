<template>
  <div class="p-8 mb-12 pb-0 text-yellow-500">
    <h1 class="text-4xl font-bold mb-4">How About One Of These Meals?</h1>
    <p class="text-sky-900">We've generated a list of meals we think you'll love. Not quite right? Search for your favorite or view meals in alphabetical order.</p>
  </div>
  <Meals :meals="meals" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store";
import Meals from "../components/Meals.vue";
import axiosClient from "../axiosClient.js";

const meals = ref([]);

onMounted(async () => {
  for (let i = 0; i < 10; i++) {
    axiosClient
      .get(`random.php`)
      .then(({ data }) => meals.value.push(data.meals[0]));
  }
});
</script>
