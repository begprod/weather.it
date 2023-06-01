<template>
  <div class="relative">
    <SearchInput />
    <div class="absolute left-0 top-full w-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-hidden">
      <SearchSuggestionItem />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchInput from '@/components/ui/SearchInput.vue';
import SearchSuggestionItem from '@/components/ui/SearchSuggestionItem.vue';
</script>
