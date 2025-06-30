<template>
  <main class="layout font-body">
    <div class="layout__inner">
      <slot />

      <BaseFooterDefault :version="version" />
    </div>

    <div class="layout__controls-panel">
      <Transition name="slide-up">
        <BaseButton
          v-if="needRefresh"
          class="animate-shake"
          view="primary"
          title="update application"
          @click="updateServiceWorker(true)"
        >
          <span>Update ready</span>
          <Rocket />
        </BaseButton>
      </Transition>

      <Transition name="slide-up">
        <BaseButtonUpdate v-if="cities.length" />
      </Transition>
    </div>

    <Transition name="slide-up">
      <BaseToast v-if="isToastVisible" :type="status" :message="message" @click="closeToast" />
    </Transition>

    <BaseGithubCorner url="https://github.com/begprod/weather.it" />
  </main>
</template>

<script setup lang="ts">
import { version } from '../../../../package.json';
import { storeToRefs } from 'pinia';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { Rocket } from 'lucide-vue-next';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault/BaseFooterDefault.vue';
import BaseGithubCorner from '@/components/ui/BaseGithubCorner/BaseGithubCorner.vue';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';
import BaseButtonUpdate from '@/components/BaseButtonUpdate/BaseButtonUpdate.vue';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';

const { needRefresh, updateServiceWorker } = useRegisterSW();

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

.layout__controls-panel {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  z-index: 40;
}
</style>
