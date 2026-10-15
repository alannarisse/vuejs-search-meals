import { computed, readonly, ref } from 'vue';

const storageKey = 'scrumptious:favorite-meals';

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return Array.isArray(saved) ? saved.filter(id => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

const favoriteIds = ref(loadFavorites());

export function useFavoriteIds() {
  return readonly(favoriteIds);
}

export function useFavorites(mealId) {
  const isFavorite = computed(() => favoriteIds.value.includes(String(mealId())));

  function toggleFavorite() {
    const id = String(mealId());
    favoriteIds.value = isFavorite.value
      ? favoriteIds.value.filter(savedId => savedId !== id)
      : [...favoriteIds.value, id];

    try {
      localStorage.setItem(storageKey, JSON.stringify(favoriteIds.value));
    } catch {
      // Keep the toggle working for this session if browser storage is unavailable.
    }
  }

  return { isFavorite, toggleFavorite };
}
