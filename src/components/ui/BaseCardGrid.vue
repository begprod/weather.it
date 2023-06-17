<template>
  <div class="w-full max-w-screen-2xl m-auto grid grid-cols-1 auto-rows-cards gap-4 mt-20 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-8">
    <TransitionGroup name="fade">
      <BaseCardCity
        v-for="city in weatherStore.getCities"
        :key="city.id"
        :city="city"
        :image="weatherStore.getImages[city.id] ? weatherStore.getImages[city.id] : ''"
        :is-loading="commonStore.getStatus === 'updating'"
      />
    </TransitionGroup>

    <BaseCardCitySkeleton v-if="commonStore.getStatus === 'loading'" />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseCardCity from '@/components/ui/BaseCardCity.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();
</script>
