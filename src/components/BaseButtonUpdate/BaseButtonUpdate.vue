<template>
  <div class="fixed right-6 bottom-6 flex flex-col items-center z-40">
    <BaseButton title="Update weather data" @click="updateCityData">
      <ArrowPathIcon class="w-5 h-5" :class="classObject" />
    </BaseButton>

    <Transition name="slide-down">
      <span
        v-if="lastUpdateDate"
        class="mt-2 p-[2px] rounded-[3px] text-[10px] md:text-xs text-gray-500 bg-white"
      >
        {{ lastUpdateDate }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore, useWeatherStore } from '@/stores';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const { status } = storeToRefs(commonStore);
const { lastUpdateDate } = storeToRefs(weatherStore);
const { updateCityData } = weatherStore;

const classObject = computed(() => {
  return {
    'animate-spin animation-duration-2000': status.value === 'updating',
  };
});
</script>
