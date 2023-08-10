<template>
  <div class="group relative p-10 text-white overflow-hidden rounded-[20px] shadow-md isolate">
    <div class="relative z-30 select-none">
      <div class="flex items-start">
        <v-icon name="fa-map-marker-alt" class="w-6 h-7 shrink-0 mr-1" />
        <div class="flex flex-col">
          <span class="text-2xl">{{ city.name }}</span>
          <span class="text-xs">{{ city.country }}</span>
        </div>
      </div>
      <p class="flex items-start mt-5 mb-2 text-7xl font-bold">
        {{ city.weather.current }}
        <v-icon name="ri-celsius-line" class="w-7 h-7" />
      </p>
      <p class="flex text-lg">
        feels like:
        <span class="flex items-start ml-1">
          {{ city.weather.feels_like }}
          <v-icon name="ri-celsius-line" class="w-3 h-3" />
        </span>
      </p>
      <p class="flex text-lg">
        air:
        <span class="flex items-center ml-1">
          <v-icon name="fa-circle" class="w-6 h-6 shrink-0 mr-1" :class="airQuality" />
        </span>
      </p>
      <p class="text-sm mt-3">{{ city.weather.description }}</p>
      <BaseWeatherIcon class="mt-3" :type="city.weather.main.toLowerCase()" />
    </div>

    <BaseDropdownMenu
      class="!absolute top-10 right-10 z-30 transition-all duration-300 ease-in-out"
      :isMenuOpen="isMenuOpen"
      @toggleMenu="toggleMenu"
      @closeMenu="closeMenu"
    >
      <button
        class="border w-full flex items-center justify-center p-2 text-red-600 hover:bg-slate-200 transition-all duration-300 ease-in-out"
        type="button"
        @click="weatherStore.removeCity(city.id)"
      >
        <v-icon name="co-trash" class="w-6 h-6 mr-2"></v-icon>
        Delete city
      </button>
    </BaseDropdownMenu>
    <div class="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-700 opacity-50" />
    <div
      class="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${image})` }"
    />

    <Transition name="fade">
      <div
        v-if="isLoading"
        class="absolute top-0 left-0 right-0 z-30 w-full h-full bg-cover bg-center"
      >
        <BaseCardCitySkeleton />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ICityWeather } from '@/types';
import { useWeatherStore } from '@/stores';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton.vue';
import BaseWeatherIcon from '@/components/icons/BaseWeatherIcon.vue';
import BaseDropdownMenu from '@/components/ui/BaseDropdownMenu.vue';

interface IProps {
  city: ICityWeather;
  image: string;
  isLoading?: boolean;
}

const props = defineProps<IProps>();

const weatherStore = useWeatherStore();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const airQuality = computed(() => {
  switch (props.city.weather.air_quality) {
    case 1:
      return 'fill-green-500';
    case 2:
      return 'fill-green-300';
    case 3:
      return 'fill-yellow-300';
    case 4:
      return 'fill-orange-400';
    case 5:
      return 'fill-red-500';
    default:
      return 'fill-gray-400';
  }
});
</script>
