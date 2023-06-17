<template>
  <main class="font-body overflow-hidden">
    <div class="min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pl-6">
      <slot />
      <BaseFooterDefault />
    </div>

    <Transition name="slide-up">
      <BaseButtonUpdate
        v-if="weatherStore.getCities.length"
      />
    </Transition>

    <BaseToast
      :type="commonStore.getStatus"
      :message="commonStore.getMessage"
      :is-visible="commonStore.getToastVisibility"
      :click-handler="commonStore.closeToast"
    />

    <BaseGithubCorner url="https://github.com/begprod/weather.it" />
  </main>
</template>

<script setup lang="ts">
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault.vue';
import BaseButtonUpdate from '@/components/ui/BaseButtonUpdate.vue';
import BaseGithubCorner from '@/components/other/BaseGithubCorner.vue';
import BaseToast from '@/components/ui/BaseToast.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();
</script>
