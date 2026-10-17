<template>
  <section class="mt-6">
    <label for="recipe-notes" class="block text-2xl font-semibold mb-2">My Notes</label>
    <textarea
      id="recipe-notes"
      :value="notes"
      maxlength="500"
      rows="5"
      class="w-full rounded border-2 border-gray-200 bg-white focus:ring-sky-700 focus:border-sky-700"
      placeholder="Add your tips, substitutions, or reminders for this recipe…"
      aria-describedby="recipe-notes-count recipe-notes-status"
      @input="saveNotes"
    ></textarea>
    <p id="recipe-notes-count" class="text-sm">{{ notes.length }}/500 characters</p>
    <p id="recipe-notes-status" class="text-sm" role="status">{{ status }}</p>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  mealId: { type: [String, Number], required: true }
});
const notes = ref('');
const status = ref('');
const storageKey = () => `scrumptious:recipe-notes:${props.mealId}`;

watch(() => props.mealId, () => {
  notes.value = '';
  status.value = '';
  try {
    notes.value = (localStorage.getItem(storageKey()) || '').slice(0, 500);
  } catch {
    status.value = 'Browser storage is unavailable. Notes cannot be saved.';
  }
}, { immediate: true });

function saveNotes(event) {
  notes.value = event.target.value.slice(0, 500);
  try {
    if (notes.value) {
      localStorage.setItem(storageKey(), notes.value);
    } else {
      localStorage.removeItem(storageKey());
    }
    status.value = 'Saved in this browser.';
  } catch {
    status.value = 'Notes could not be saved. Browser storage may be unavailable or full.';
  }
}
</script>
