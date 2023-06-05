<template>
  <main class="font-body">
    <div class="min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pl-6">
      <slot />
      <FooterDefault />
    </div>

    <ButtonUpdate />

<!-- TODO: Toast component -->

    <GithubCorner url="https://github.com/begprod/weather.it" />
  </main>
</template>

<script setup lang="ts">
import FooterDefault from '@/components/layouts/partials/FooterDefault.vue';
import ButtonUpdate from '@/components/ui/ButtonUpdate.vue';
import GithubCorner from '@/components/other/GithubCorner.vue';
</script>
