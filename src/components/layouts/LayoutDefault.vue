<template>
  <main class="font-body">
    <div class="min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pl-6">
      <slot />
      <FooterDefault />
    </div>

    <ButtonUpdate />
  </main>
</template>

<script setup lang="ts">
import FooterDefault from '@/components/layouts/partials/FooterDefault.vue';
import ButtonUpdate from '@/components/ui/ButtonUpdate.vue';
</script>
