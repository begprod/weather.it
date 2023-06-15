<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useWeatherStore } from '@/stores';

const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.updateCityData();
});
</script>
