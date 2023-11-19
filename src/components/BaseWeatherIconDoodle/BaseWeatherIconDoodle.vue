<template>
  <div class="flex justify-between mb-10 text-center text-5xl weather-doodle">
    <BaseWeatherIcon type="clear" />
    <BaseWeatherIcon type="clouds" />
    <BaseWeatherIcon type="snow" />
    <BaseWeatherIcon type="mist" />
  </div>
</template>

<script setup lang="ts">
import BaseWeatherIcon from '@/components/ui/BaseWeatherIcon/BaseWeatherIcon.vue';
</script>

<style lang="scss">
@use 'sass:math';

.weather-doodle {
  @for $i from 1 through 4 {
    .weather-icon:nth-child(#{$i}) {
      animation: floating 3s ease-in-out infinite;
      animation-delay: math.random(10) * 1s;
    }
  }
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
