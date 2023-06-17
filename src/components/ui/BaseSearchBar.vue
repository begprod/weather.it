<template>
  <div class="relative">
    <BaseWeatherIconDoodle />

    <BaseSearchInput
      id="city_search"
      type="text"
      label="Search"
      placeholder="Start typing city name..."
      autoComplete="off"
      v-model="searchQuery"
    />

    <div class="absolute left-0 top-full w-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-hidden">
      <div
        v-if="!isSearching && citiesSuggestions.length === 0 && searchQuery.length !== 0"
        class="flex items-center justify-center w-full p-3 select-none"
      >
        <v-icon name="md-locationoff-twotone" class="w-6 h-6 mr-3 opacity-30"/>
        <div class="text-xl overflow-hidden">
          <p class="text-xl">City not found</p>
        </div>
      </div>

      <div
        v-else-if="isSearching && searchQuery.length !== 0"
        class="flex items-center justify-center w-full p-3"
      >
        <div class="animate-spin">
          <v-icon name="ri-loader-line" class="w-6 h-6 opacity-30" />
        </div>
      </div>

      <template v-else>
        <BaseSearchSuggestionItem
          v-for="item in citiesSuggestions"
          :key="item.id"
          :name="item.name"
          :country="item.country"
          @click="getCityWeather(item)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ISearchSuggestItem } from '@/types';
import { watchDebounced } from '@vueuse/core';
import { useCommonStore, useWeatherStore } from '@/stores';
import { suggestionsCitiesService } from '@/services';
import BaseSearchInput from '@/components/ui/BaseSearchInput.vue';
import BaseSearchSuggestionItem from '@/components/ui/BaseSearchSuggestionItem.vue';
import BaseWeatherIconDoodle from '@/components/icons/BaseWeatherIconDoodle.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();
const searchQuery = ref('');
const citiesSuggestions = ref([]);
const isSearching = ref(false);

watch(searchQuery, () => {
  if (searchQuery.value.length === 0) {
    citiesSuggestions.value = [];
    isSearching.value = false;

    return;
  }

  isSearching.value = true;
});

watchDebounced(searchQuery, async () => {
  await suggestionsCitiesService(searchQuery.value)
    .then((suggestionList) => {
      if (suggestionList.length > 0) {
        citiesSuggestions.value = suggestionList.filter((city) => {
          return !weatherStore.getIds.includes(city.id);
        });

        isSearching.value = false;
      } else {
        isSearching.value = false;
      }
    })
    .catch(() => {
      isSearching.value = false;
      commonStore.setStatus('error');
      commonStore.setMessage('Something went wrong with the search suggestion. Please try again later.');
      commonStore.showToast();
    });
}, { debounce: 1100, maxWait: 5000 });

function getCityWeather(suggestionItem: ISearchSuggestItem) {
  isSearching.value = false;
  searchQuery.value = '';
  citiesSuggestions.value = [];

  weatherStore.getCityData(suggestionItem);
}
</script>
