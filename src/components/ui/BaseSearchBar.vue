<template>
  <div class="relative">
    <BaseWeatherIconDoodle />

    <BaseSearchInput
      id="city_search"
      type="text"
      label="Search"
      placeholder="Start typing the name of the city"
      autoComplete="off"
      v-model="searchQuery"
      :required="true"
    />

    <BaseSuggestionsList
      :isEmpty="!isSearching && citiesSuggestions.length === 0 && searchQuery.length !== 0"
      :isLoading="isSearching && searchQuery.length !== 0"
      :isItemsListVisible="citiesSuggestions.length > 0 && searchQuery.length !== 0 && !isSearching"
    >
      <BaseSearchSuggestionItem
        v-for="item in citiesSuggestions"
        :key="item.id"
        :name="item.name"
        :country="item.country"
        @click="getCityWeather(item)"
      />
    </BaseSuggestionsList>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { ISearchSuggestItem } from '@/types';
import { watchDebounced } from '@vueuse/core';
import { useCommonStore, useWeatherStore } from '@/stores';
import { suggestionsCitiesService } from '@/services';
import BaseWeatherIconDoodle from '@/components/icons/BaseWeatherIconDoodle.vue';
import BaseSearchInput from '@/components/ui/BaseSearchInput.vue';
import BaseSuggestionsList from '@/components/ui/BaseSuggestionsList.vue';
import BaseSearchSuggestionItem from '@/components/ui/BaseSearchSuggestionItem.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();
const searchQuery = ref<string>('');
const isSearching = ref<boolean>(false);
const citiesSuggestions = ref<Array<ISearchSuggestItem>>([]);

const { ids } = storeToRefs(weatherStore);
const { setStatus, setMessage, showToast } = commonStore;
const { getCityData } = weatherStore;

watch(searchQuery, () => {
  if (searchQuery.value.length === 0) {
    citiesSuggestions.value = [];
    isSearching.value = false;

    return;
  }

  isSearching.value = true;
});

watchDebounced(
  searchQuery,
  async () => {
    await suggestionsCitiesService(searchQuery.value)
      .then((suggestionList) => {
        if (suggestionList.length > 0) {
          citiesSuggestions.value = suggestionList.filter((city) => {
            return !ids.value.includes(city.id);
          });

          isSearching.value = false;
        } else {
          citiesSuggestions.value = [];
          isSearching.value = false;
        }
      })
      .catch(() => {
        isSearching.value = false;
        setStatus('error');
        setMessage('Something went wrong with the search suggestion. Please try again later.');
        showToast();
      });
  },
  { debounce: 1100, maxWait: 5000 },
);

function getCityWeather(suggestionItem: ISearchSuggestItem) {
  isSearching.value = false;
  searchQuery.value = '';
  citiesSuggestions.value = [];

  getCityData(suggestionItem);
}
</script>
