<template>
  <footer
    class="flex flex-col items-center justify-center gap-2 pt-16 pb-24 md:pt-32 md:pb-16 text-sm text-gray-500"
  >
    <p>
      Crafted with <span class="text-red-500">❤</span> by
      <a href="https://github.com/begprod" class="text-blue-600" tabindex="-1">Andrej Aratov</a>
    </p>
    <p>
      <a
        class="text-blue-600"
        href="https://github.com/begprod/weather.it#install-application-on-your-device"
        target="_blank"
        rel="noreferrer"
        tabindex="-1"
      >
        Install app on device instructions
        <span class="inline-block ml-2 -rotate-12 origin-center">→</span>
      </a>
    </p>
    <p data-test-id="app-version">v{{ version }}</p>
  </footer>
</template>

<script setup lang="ts">
interface IProps {
  version: string;
}

defineProps<IProps>();
</script>
