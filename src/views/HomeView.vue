<template>
  <BaseLayoutDefault>
    <div class="w-full md:w-[500px]">
      <BaseSearchBar />
    </div>
    <BaseCardGrid />
  </BaseLayoutDefault>
</template>

<script setup lang="ts">
import BaseLayoutDefault from '@/components/layouts/BaseLayoutDefault/BaseLayoutDefault.vue';
import BaseSearchBar from '@/components/BaseSearchBar/BaseSearchBar.vue';
import BaseCardGrid from '@/components/BaseCardGrid/BaseCardGrid.vue';
</script>
