<template>
  <router-link :to="to"
    class="px-3 py-2 border-2 text-white border-yellow-600 bg-yellow-500 hover:bg-sky-600 hover:border-sky-800 font-bold transition-colors">
    <slot>Recipes</slot>
  </router-link>
</template>

<script setup>
  const props = defineProps({
    to: {
      type: [String, Object],
      required: true
    }
  })
</script>
