<template>
  <BaseToast
    :is-visible="needRefresh"
    type="success"
    message="New version of the app is available."
    :click-handler="close"
  >
    <button class="button" @click="updateServiceWorker(true)">Update</button>
  </BaseToast>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import BaseToast from './BaseToast.vue';

const { needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  await updateServiceWorker();
  needRefresh.value = false;
};
</script>

<style lang="scss" scoped>
.button {
  @apply flex items-center justify-center w-full mt-4 text-sm p-2 bg-green-200 rounded-lg;
}
</style>
