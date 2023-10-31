<template>
  <main class="font-body overflow-hidden">
    <div class="min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pl-6">
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
import { version } from '../../../package.json';
import { storeToRefs } from 'pinia';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault.vue';
import BaseButtonUpdate from '@/components/ui/BaseButtonUpdate.vue';
import BaseGithubCorner from '@/components/other/BaseGithubCorner.vue';
import BaseToast from '@/components/ui/BaseToast.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();

const { status, message, toastIsVisible } = storeToRefs(commonStore);
const { cities } = storeToRefs(weatherStore);
const { closeToast } = commonStore;
</script>
