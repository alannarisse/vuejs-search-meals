<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-yellow-500">Favorites</h1>
  </div>
  <p v-if="!favoriteIds.length" class="px-8 py-4">
    No favorites yet. Click the heart on a meal to save it here.
  </p>
  <template v-else>
    <p v-if="loading" class="px-8 py-4" role="status">Loading your favorites…</p>
    <div v-if="loadError" class="px-8 py-4" role="alert">
      <p>Some favorites could not be loaded. Please try again.</p>
      <button type="button" class="underline cursor-pointer" @click="retry++">Retry</button>
    </div>
    <p v-if="!loading && !loadError && !meals.length" class="px-8 py-4">
      Your saved recipes are no longer available.
    </p>
    <Meals v-if="meals.length" :meals="meals" />
  </template>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import axiosClient from '../axiosClient';
import Meals from '../components/Meals.vue';
import { useFavoriteIds } from '../composables/useFavorites';

const favoriteIds = useFavoriteIds();
const loadedMeals = ref([]);
const loading = ref(false);
const loadError = ref(false);
const retry = ref(0);
const meals = computed(() => loadedMeals.value.filter(meal =>
  favoriteIds.value.includes(String(meal.idMeal))
));

watch([favoriteIds, retry], async ([ids], previous, onCleanup) => {
  let cancelled = false;
  onCleanup(() => { cancelled = true; });
  loadError.value = false;
  loading.value = ids.length > 0;
  if (!ids.length) {
    loadedMeals.value = [];
    return;
  }

  const results = await Promise.allSettled(ids.map(id =>
    axiosClient.get(`lookup.php?i=${encodeURIComponent(id)}`)
  ));
  if (cancelled) return;

  loadedMeals.value = results.flatMap(result =>
    result.status === 'fulfilled' ? (result.value.data.meals || []) : []
  );
  loadError.value = results.some(result => result.status === 'rejected');
  loading.value = false;
}, { immediate: true });
</script>
