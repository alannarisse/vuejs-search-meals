<template>
  <navbar />
  <main>
    <div class="w-{80%} mx-auto">
      <router-view />
    </div>
  </main>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>
