<template>
  <LayoutDefault>
    <div class="w-full md:w-[500px]">
      <SearchBar />
    </div>
    <CardGrid />
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '@/components/layouts/LayoutDefault.vue';
import SearchBar from '@/components/ui/SearchBar.vue';
import CardGrid from '@/components/ui/CardGrid.vue';
</script>
