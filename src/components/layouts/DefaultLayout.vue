<template>
  <main class="font-body">
    <div class="min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pl-6">
      <slot />
      <DefaultFooter />
    </div>

    <ButtonUpdate />
  </main>
</template>

<script setup lang="ts">
import DefaultFooter from "@/components/layouts/partials/DefaultFooter.vue";
import ButtonUpdate from "@/components/ui/ButtonUpdate.vue";
</script>
