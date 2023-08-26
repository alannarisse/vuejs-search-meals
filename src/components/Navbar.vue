<template>
  <header class="bg-white shadow h-26 flex justify-between items-stretch">
    <router-link
      :to="{ name: 'home' }"
      class="logotype text-4xl my-4 inline-flex items-center h-full px-5 text-fuchsia-900 font-bold"
    >
      YumYum<br>FoodFun
    </router-link>
    <div class="flex items-center gap-1">
      <router-link
        :to="{ name: 'byName' }"
        class="inline-flex items-center px-2 h-12 transition-colors hover:bg-orange-500 hover:text-white"
      >
        Search Meals
      </router-link>
      <router-link
        :to="{ name: 'byLetter' }"
        class="inline-flex items-center px-2 h-12 transition-colors hover:bg-orange-500 hover:text-white"
      >
        Meals By Letter
      </router-link>
      <router-link
        :to="{ name: 'ingredients' }"
        class="inline-flex items-center px-2 h-12 transition-colors hover:bg-orange-500 hover:text-white"
      >
        Meals By Ingredients
      </router-link>
    </div>
  </header>
</template>
