<template>
  <header class="pb-4 pt-4 flex justify-between items-stretch">
    <router-link
      :to="{ name: 'home' }"
      class="logotype text-4xl my-4 inline-flex items-center h-full px-5 text-sky-900 font-bold"
    >
      <img :src="'./assets/logo.svg'"
      :class="'logo'"
      :alt="'Scrumptious'"
      />
    </router-link>
    <div class="flex items-center gap-2 pr-8">
      <router-link
        :to="{ name: 'byName' }"
        class="inline-flex items-center px-2 h-12 font-medium transition-colors border-b-4 border-transparent hover:border-b-4 hover:border-yellow-400  hover:text-sky-900"
      >
        Search Meals
      </router-link>
      <router-link
        :to="{ name: 'byLetter' }"
        class="inline-flex items-center px-2 h-12 font-medium transition-colors border-b-4 border-transparent hover:border-b-4 hover:border-yellow-400  hover:text-sky-900"
      >
        Meals By Letter
      </router-link>
      <router-link
        :to="{ name: 'ingredients' }"
        class="inline-flex items-center px-2 h-12 font-medium transition-colors border-b-4 border-transparent hover:border-b-4 hover:border-yellow-400  hover:text-sky-900"
      >
        Meals By Ingredients
      </router-link>
    </div>
  </header>
</template>
