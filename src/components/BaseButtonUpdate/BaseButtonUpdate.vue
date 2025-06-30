<template>
  <div class="button-update">
    <BaseButton title="Update weather data" @click="updateCityData">
      <RefreshCcw class="icon icon_md" :class="classObject" />
    </BaseButton>

    <Transition name="slide-down">
      <span v-if="lastUpdateDate" class="button-update__date">
        {{ lastUpdateDate }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore, useWeatherStore } from '@/stores';
import { RefreshCcw } from 'lucide-vue-next';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const { status } = storeToRefs(commonStore);
const { lastUpdateDate } = storeToRefs(weatherStore);
const { updateCityData } = weatherStore;

const classObject = computed(() => {
  return {
    'animate-spin': status.value === 'updating',
  };
});
</script>

<style scoped>
.button-update {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-update__date {
  margin-top: 0.5rem;
  padding: 4px;
  border-radius: 4px;
  font-size: clamp(var(--typo-size-2xs), 1.56vw, var(--typo-size-xs));
  line-height: 1;
  color: var(--gray-500);
  background-color: var(--white);
}
</style>
