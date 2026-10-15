<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-yellow-500">Search for the Name of the Recipe You Are Looking For</h1>
  </div>
  <div class="px-8 pb-3">
    <input
      type="text"
      v-model="keyword"
      class="rounded border-2 bg-white border-gray-200 focus:ring-sky-700 focus:border-sky-700 w-full"
      placeholder="Search for Meals"
      @change="searchMeals"
    />
  </div>

  <Meals :meals="meals" />
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import Meals from '../components/Meals.vue'

const route = useRoute();
const keyword = ref("");
const meals = computed(() => store.state.searchedMeals);
const lastSearchKey = 'scrumptious:last-search';

function loadLastSearch() {
  try {
    return localStorage.getItem(lastSearchKey) || '';
  } catch {
    return '';
  }
}

function searchMeals() {
  keyword.value = keyword.value.trim();
  try {
    if (keyword.value) {
      localStorage.setItem(lastSearchKey, keyword.value);
    } else {
      localStorage.removeItem(lastSearchKey);
    }
  } catch {
    // Searching still works if browser storage is unavailable.
  }
  if (keyword.value) {
    store.dispatch("searchMeals", keyword.value);
  } else {
    store.commit("setSearchedMeals", []);
  }
}

onMounted(() => {
  keyword.value = route.params.name || loadLastSearch();
  searchMeals();
})
</script>
