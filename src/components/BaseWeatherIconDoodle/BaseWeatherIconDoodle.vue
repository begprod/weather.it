<template>
  <div class="weather-doodle">
    <BaseWeatherIcon type="Clear" />
    <BaseWeatherIcon type="Clouds" />
    <BaseWeatherIcon type="Snow" />
    <BaseWeatherIcon type="Mist" />
  </div>
</template>

<script setup lang="ts">
import BaseWeatherIcon from '@/components/ui/BaseWeatherIcon/BaseWeatherIcon.vue';
</script>

<style scoped>
.weather-doodle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.weather-doodle {
  .weather-icon {
    &:nth-child(1) {
      animation: floating 3s ease-in-out infinite;
      animation-delay: 1s;
    }

    &:nth-child(2) {
      animation: floating 3s ease-in-out infinite;
      animation-delay: 3s;
    }

    &:nth-child(3) {
      animation: floating 3s ease-in-out infinite;
      animation-delay: 5s;
    }

    &:nth-child(4) {
      animation: floating 3s ease-in-out infinite;
      animation-delay: 7s;
    }
  }
}
</style>
