<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useWeatherStore } from '@/stores';

const weatherStore = useWeatherStore();
const { updateCityData } = weatherStore;

onMounted(async () => {
  await updateCityData();
});
</script>
