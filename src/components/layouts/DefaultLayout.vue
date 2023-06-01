<template>
  <div class="font-body">
    <slot />
    <DefaultFooter />
  </div>
</template>

<script setup lang="ts">
import DefaultFooter from "@/components/layouts/partials/DefaultFooter.vue";
</script>
