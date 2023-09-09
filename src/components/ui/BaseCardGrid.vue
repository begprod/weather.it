<template>
  <div
    class="grid-auto-rows-cards w-full max-w-screen-2xl m-auto grid grid-cols-1 gap-4 mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-8"
  >
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
import BaseCardCity from '@/components/ui/BaseCardCity.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const { status } = storeToRefs(commonStore);
const { cities, images } = storeToRefs(weatherStore);
</script>
