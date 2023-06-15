<template>
  <main class="font-body">
    <div class="min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pl-6">
      <slot />
      <BaseFooterDefault />
    </div>

    <BaseButtonUpdate
      v-if="weatherStore.getCities.length"
    />

<!-- TODO: Toast component -->

    <BaseGithubCorner url="https://github.com/begprod/weather.it" />
  </main>
</template>

<script setup lang="ts">
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault.vue';
import BaseButtonUpdate from '@/components/ui/BaseButtonUpdate.vue';
import BaseGithubCorner from '@/components/other/BaseGithubCorner.vue';
import { useWeatherStore } from '@/stores';

const weatherStore = useWeatherStore();
</script>
