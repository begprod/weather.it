<template>
  <div class="card-grid">
    <TransitionGroup name="fade">
      <BaseCardCity
        v-for="city in cities"
        :key="city.id"
        :city="city"
        :image="images[city.id] ? images[city.id] : ''"
        :is-loading="status === 'updating'"
      />
    </TransitionGroup>

    <BaseCardCitySkeleton v-if="status === 'loading'" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseCardCity from '@/components/ui/BaseCardCity/BaseCardCity.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton/BaseCardCitySkeleton.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const { status } = storeToRefs(commonStore);
const { cities, images } = storeToRefs(weatherStore);
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  width: 100%;
  gap: 1rem;
  max-width: 1536px;
  margin-top: clamp(3rem, 9.77vw, 6.25rem);
}

@media screen and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
