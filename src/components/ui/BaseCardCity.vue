<template>
  <div
    class="group relative p-5 text-white overflow-hidden rounded-[20px] shadow-md isolate md:p-7 lg:p-10"
  >
    <div class="relative z-30 select-none">
      <div class="flex items-baseline">
        <v-icon name="fa-map-marker-alt" class="w-4 h-4 shrink-0 mr-1 lg:w-6 lg:h-6" />
        <div class="flex flex-col max-w-[80%]">
          <span class="text-xl lg:text-2xl max-w-full truncate">{{ city.name }}</span>
          <span class="text-xs">{{ city.country }}</span>
        </div>
      </div>
      <div class="flex items-start mt-3 text-5xl font-bold md:mt-5 md:mb-2 md:text-7xl">
        {{ city.weather.current }}
        <v-icon name="ri-celsius-line" class="w-7 h-7" />
      </div>
      <div class="flex text-base md:text-lg">
        feels like:
        <div class="flex items-start ml-1">
          {{ city.weather.feels_like }}
          <v-icon name="ri-celsius-line" class="w-3 h-3" />
        </div>
      </div>
      <div class="flex text-base md:text-lg">
        air:
        <div class="flex items-center ml-1">
          <v-icon
            name="fa-circle"
            class="w-4 h-4 shrink-0 mr-1 md:w-6 md:h-6"
            :class="airQuality"
          />
        </div>
      </div>
      <div class="text-base md:text-lg md:mb-2">{{ city.weather.description }}</div>
      <BaseWeatherIcon class="mt-3" :type="city.weather.main.toLowerCase()" />
    </div>

    <BaseDropdownMenu
      class="!absolute top-5 right-5 lg:top-10 lg:right-8 z-30 transition-all duration-300 ease-in-out"
      :isMenuOpen="isMenuOpen"
      @toggleMenu="toggleMenu"
      @closeMenu="closeMenu"
    >
      <BaseButton
        class="w-full flex items-center justify-center p-2 text-red-600 hover:bg-slate-200 transition-all duration-300 ease-in-out"
        view="transparent"
        title="Delete city"
        @click="deleteCity(city.id)"
      >
        <v-icon name="co-trash" class="w-6 h-6 mr-2"></v-icon>
        Delete city
      </BaseButton>
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
import type { ICityWeather } from '@/types';
import { ref, computed } from 'vue';
import { useWeatherStore } from '@/stores';
import BaseButton from '@/components/ui/BaseButton.vue';
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
const { deleteCity } = weatherStore;

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
