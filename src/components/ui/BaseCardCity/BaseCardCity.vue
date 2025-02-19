<template>
  <div
    :title="`${city.country}, ${city.name}, ${city.weather.current}°C, Feels like: ${city.weather.feels_like}°C, ${city.weather.description}`"
    class="card-city"
    tabindex="0"
  >
    <div class="card-city__content">
      <div class="card-city__city">
        <MapPin class="icon icon_lg" />

        <div class="card-city__city-info">
          <span class="card-city__name" data-test-id="city-name">{{ city.name }}</span>
          <span data-test-id="city-country">{{ city.country }}</span>
        </div>
      </div>
      <div class="card-city__info">
        <div class="card-city__degrees card-city__degrees_lg">
          <span>{{ city.weather.current }}</span>
          <span>&deg;</span>
        </div>
      </div>
      <div class="card-city__info">
        <span>feels like:</span>
        <div class="card-city__degrees">
          <span>{{ city.weather.feels_like }}</span>
          <span>&deg;</span>
        </div>
      </div>
      <div class="card-city__info">
        <span>air: </span>
        <div
          class="air-quality icon icon_base icon_rounded"
          :class="airQuality"
          data-test-id="city-air"
        ></div>
      </div>
      <div class="card-city__info" data-test-id="weather-description">
        {{ city.weather.description }}
      </div>

      <BaseWeatherIcon class="card-city__weather-icon" :type="city.weather.main" />
    </div>

    <BaseDropdownMenu
      class="card-city__menu"
      :isMenuOpen="isMenuOpen"
      @toggleMenu="toggleMenu"
      @closeMenu="closeMenu"
    >
      <BaseButton
        view="transparent"
        text="alert"
        :title="`Remove ${city.name} city`"
        @click="deleteCity(city.id)"
        data-test-id="remove-city-button"
      >
        <span>Remove city</span>
        <SquareX class="icon icon_md" />
      </BaseButton>
    </BaseDropdownMenu>

    <div class="card-city__paranja" />

    <div
      class="card-city__image"
      :style="{ backgroundImage: `url(${image})` }"
      data-test-id="city-image"
    />

    <Transition name="fade">
      <div v-if="isLoading" class="card-city__skeleton">
        <BaseCardCitySkeleton />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { ICityWeather } from '@/types';
import { ref, computed } from 'vue';
import { useWeatherStore } from '@/stores';
import { MapPin, SquareX } from 'lucide-vue-next';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton/BaseCardCitySkeleton.vue';
import BaseWeatherIcon from '@/components/ui/BaseWeatherIcon/BaseWeatherIcon.vue';
import BaseDropdownMenu from '@/components/ui/BaseDropdownMenu/BaseDropdownMenu.vue';

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
      return 'air-quality_type_1';
    case 2:
      return 'air-quality_type_2';
    case 3:
      return 'air-quality_type_3';
    case 4:
      return 'air-quality_type_4';
    case 5:
      return 'air-quality_type_5';
    default:
      return 'air-quality_type_default';
  }
});

defineExpose({
  toggleMenu,
});
</script>

<style scoped>
.card-city {
  position: relative;
  padding: clamp(1.25rem, 3.13vw, 2.5rem);
  color: var(--white);
  border-radius: 1.25rem;
  box-shadow: 0 5px 15px 0 var(--gray);
  overflow: hidden;

  &:focus {
    outline: 1px solid var(--gray);
  }
}

.card-city__content {
  position: relative;
  user-select: none;
  z-index: 30;
}

.card-city__city {
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
  font-size: var(--typo-size-xs);
}

.card-city__city-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  gap: 0.2rem;
}

.card-city__name {
  font-size: clamp(var(--typo-size-lg), 2.34vw, var(--typo-size-2xl));
}

.card-city__info {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.2rem;
  line-height: 1;
  font-size: clamp(var(--typo-size-base), 1.76vw, var(--typo-size-lg));
}

.card-city__degrees {
  display: flex;
  gap: 0.2rem;
  font-size: var(--typo-size-xs);

  span {
    &:first-child {
      font-size: var(--typo-size-lg);
    }
  }
}

.card-city__degrees_lg {
  font-size: var(--typo-size-lg);

  span {
    &:first-child {
      font-size: clamp(var(--typo-size-5xl), 7.03vw, var(--typo-size-7xl));
    }
  }

  span:nth-child {
    font-size: inherit;
  }
}

.card-city__weather-icon {
  margin-top: 1.5rem;
}

.card-city__menu {
  position: absolute;
  top: clamp(1.25rem, 3.13vw, 2.5rem);
  right: clamp(1.25rem, 3.13vw, 2.5rem);
  z-index: 30;
}

.card-city__image {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 10;
}

.card-city__skeleton {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 30;
}

.card-city__paranja {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: var(--slate-700);
  opacity: 0.5;
  z-index: 20;
}

.air-quality_type_default {
  background-color: var(--gray);
}

.air-quality_type_1 {
  background-color: var(--green-500);
}

.air-quality_type_2 {
  background-color: var(--green-300);
}

.air-quality_type_3 {
  background-color: var(--yellow-300);
}

.air-quality_type_4 {
  background-color: var(--orange-400);
}

.air-quality_type_5 {
  background-color: var(--red-500);
}
</style>
