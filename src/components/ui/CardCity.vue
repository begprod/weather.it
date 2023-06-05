<template>
  <div class="group relative min-h-[350px] p-10 text-white overflow-hidden rounded-[20px] shadow-md isolate">
    <div class="relative z-30 select-none">
      <div class="flex items-start">
        <v-icon name="fa-map-marker-alt" class="w-6 h-7 shrink-0 mr-1"/>
        <div class="flex flex-col">
          <span class="text-2xl">{{city.name}}</span>
          <span class="text-xs">{{city.country}}</span>
        </div>
      </div>
      <p class="flex items-start mt-5 mb-2 text-7xl font-bold">
        {{city.weather.current}}
        <v-icon name="ri-celsius-line" class="w-7 h-7"/>
      </p>
      <p class="flex text-lg">
        feels like:
        <span class="flex items-start ml-1">
          {{city.weather.feels_like}}
          <v-icon name="ri-celsius-line" class="w-3 h-3"/>
        </span>
      </p>
      <p class="text-sm">{{city.weather.description}}</p>
<!--      <div class={`mt-5 weather-icon weather-icon_${setWeatherTypeIcon(props.city.weather.main)}`}>-->
<!--        {particles()}-->
<!--      </div>-->
    </div>

    <button
      class="group-hover:visible group-hover:opacity-100 absolute top-3 right-3 z-30 invisible opacity-0 transition-all duration-300 ease-in-out"
      type="button"
    >
      <v-icon name="io-close" class="w-7 h-7"/>
    </button>
    <div class="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
    <div
      class="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${image})` }"
    />
  </div>
</template>

<script setup lang="ts">
import type { ICityWeather } from '@/types';

interface IProps {
  city: ICityWeather,
  image: string,
}

defineProps<IProps>();
</script>
