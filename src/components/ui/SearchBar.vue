<template>
  <div class="relative">
    <SearchInput
      id="city_search"
      type="text"
      label="Search"
      placeholder="Start typing city name..."
      autoComplete="off"
      v-model="searchValue"
    />
    <div class="absolute left-0 top-full w-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-hidden">
      <SearchSuggestionItem
        v-for="item in citiesSuggestions"
        :key="item.id"
        :name="item.name"
        :country="item.country"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';
// import { UseCommonStore } from '@/stores/common';
import { getCitiesSuggestions } from '@/services/citySearchService';
import SearchInput from '@/components/ui/SearchInput.vue';
import SearchSuggestionItem from '@/components/ui/SearchSuggestionItem.vue';

const searchValue = ref('');
const citiesSuggestions = ref([]);

// TODO: Empty array of suggestions
// TODO: handle status state in the UseCommonStore
// TODO: Handle error and put it in the UseCommonStore

watchDebounced(searchValue, async () => {
  if (searchValue.value.length < 3) {
    citiesSuggestions.value = [];
    return;
  }

  await getCitiesSuggestions(searchValue.value)
    .then((data) => {
      citiesSuggestions.value = data;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}, { debounce: 1100, maxWait: 5000 });


</script>
