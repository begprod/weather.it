<template>
  <div class="fixed right-6 bottom-6 flex flex-col items-center z-50">
    <button
      class="rounded-full bg-white border p-3 md:p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300"
      type="button"
      title="Update weather data"
    >
      <v-icon name="hi-refresh" />
    </button>
    <span class="mt-1 md:mt-3 p-[2px] rounded-[3px] text-[10px] md:text-xs text-gray-500 bg-white">lastUpdate</span>
  </div>
</template>

<script setup lang="ts">
</script>
