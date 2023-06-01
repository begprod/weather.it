<template>
  <div class="w-full max-w-screen-2xl m-auto grid grid-cols-1 gap-4 mt-20 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-8">
    <CardCity v-for="city in 3" :key="city" />
  </div>
</template>

<script setup lang="ts">
import CardCity from '@/components/ui/CardCity.vue';
</script>
