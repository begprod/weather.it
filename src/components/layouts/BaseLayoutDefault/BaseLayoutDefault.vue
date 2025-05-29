<template>
  <main class="layout font-body">
    <div class="layout__inner">
      <slot />

      <BaseFooterDefault :version="version" />
    </div>

    <Transition name="slide-up">
      <BaseButtonUpdate v-if="cities.length" />
    </Transition>

    <Transition name="slide-up">
      <BaseToast v-if="isToastVisible" :type="status" :message="message" @click="closeToast" />
    </Transition>

    <BaseGithubCorner url="https://github.com/begprod/weather.it" />
  </main>
</template>

<script setup lang="ts">
import { version } from '../../../../package.json';
import { storeToRefs } from 'pinia';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault/BaseFooterDefault.vue';
import BaseGithubCorner from '@/components/ui/BaseGithubCorner/BaseGithubCorner.vue';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';
import BaseButtonUpdate from '@/components/BaseButtonUpdate/BaseButtonUpdate.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const { status, message, isToastVisible } = storeToRefs(commonStore);
const { cities } = storeToRefs(weatherStore);
const { closeToast } = commonStore;
</script>

<style scoped>
.layout {
  padding: 8rem 1.5rem 0 1.5rem;
  overflow: hidden;
}

.layout__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
}
</style>
