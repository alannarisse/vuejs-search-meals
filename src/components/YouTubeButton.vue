<template>
  <a
    :href="href"
    target="_blank"
    class="px-3 py-2 border-2 text-white border-yellow-600 bg-yellow-500 hover:bg-sky-600 hover:border-sky-800 font-bold transition-colors"
  >
    <slot>YouTube</slot>
  </a>
</template>

<script setup>
const props = defineProps({
  href: String
})
</script>
