<template>
  <BaseLayoutDefault>
    <div class="w-full md:w-[500px]">
      <BaseSearchBar />
    </div>
    <BaseCardGrid />
  </BaseLayoutDefault>
</template>

<script setup lang="ts">
import BaseLayoutDefault from '@/components/layouts/BaseLayoutDefault.vue';
import BaseSearchBar from '@/components/ui/BaseSearchBar.vue';
import BaseCardGrid from '@/components/ui/BaseCardGrid.vue';
</script>
