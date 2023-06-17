<template>
  <div class="fixed right-6 bottom-6 flex flex-col items-center z-40">
    <button
      class="rounded-full bg-white border p-3 md:p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300"
      type="button"
      title="Update weather data"
      @click="weatherStore.updateCityData()"
    >
      <v-icon
        name="hi-refresh"
        :class="classObject"
      />
    </button>

    <Transition name="slide-down">
      <span
        v-if="weatherStore.getLastUpdateDate"
        class="mt-1 md:mt-3 p-[2px] rounded-[3px] text-[10px] md:text-xs text-gray-500 bg-white">
        {{ weatherStore.getLastUpdateDate }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCommonStore, useWeatherStore } from '@/stores';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const classObject = computed(() => {
  return {
    'animate-spin': commonStore.getStatus === 'updating',
  };
});
</script>
