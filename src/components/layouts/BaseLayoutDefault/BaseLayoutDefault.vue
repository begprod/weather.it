<template>
  <main class="layout font-body">
    <div class="layout__inner">
      <slot />
      <BaseFooterDefault :version="version" />
    </div>

    <Transition name="slide-up">
      <BaseButtonUpdate v-if="cities.length" />
    </Transition>

    <BaseToast :type="status" :message="message" :is-visible="toastIsVisible" @click="closeToast" />

    <BaseGithubCorner url="https://github.com/begprod/weather.it" />
  </main>
</template>

<script setup lang="ts">
// @ts-ignore
import { version } from '../../../../package.json';
import { storeToRefs } from 'pinia';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault/BaseFooterDefault.vue';
import BaseGithubCorner from '@/components/ui/BaseGithubCorner/BaseGithubCorner.vue';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';
import BaseButtonUpdate from '@/components/BaseButtonUpdate/BaseButtonUpdate.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const { status, message, toastIsVisible } = storeToRefs(commonStore);
const { cities } = storeToRefs(weatherStore);
const { closeToast } = commonStore;
</script>

<style scoped>
.layout__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 1.5rem 0 1.5rem;
}
</style>
