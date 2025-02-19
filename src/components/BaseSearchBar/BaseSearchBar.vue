<template>
  <BaseWeatherIconDoodle />

  <div class="search-bar">
    <BaseSearchInput
      id="city_search"
      type="text"
      label="Weather search, start typing city name"
      placeholder="Start typing the city name"
      autoComplete="off"
      v-model="searchQuery"
      :required="true"
    />

    <BaseSuggestionsList
      :isEmpty="!isSearching && citiesSuggestions.length === 0 && searchQuery.length !== 0"
      :isLoading="isSearching && searchQuery.length !== 0"
      :list-items="citiesSuggestions"
      @item-click="getCityWeather"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { ISearchSuggestItem } from '@/types';
import { watchDebounced } from '@vueuse/core';
import { useCommonStore, useWeatherStore } from '@/stores';
import { suggestionsCitiesService } from '@/services';
import BaseSearchInput from '@/components/ui/BaseSearchInput/BaseSearchInput.vue';
import BaseWeatherIconDoodle from '@/components/BaseWeatherIconDoodle/BaseWeatherIconDoodle.vue';
import BaseSuggestionsList from '@/components/BaseSuggestionsList/BaseSuggestionsList.vue';

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

const getCityWeather = async (suggestionItem: ISearchSuggestItem) => {
  isSearching.value = false;
  searchQuery.value = '';
  citiesSuggestions.value = [];

  await getCityData(suggestionItem);

  // eslint-disable-next-line no-undef
  const cityCards: NodeListOf<HTMLElement> = document.querySelectorAll('.card-city');

  if (cityCards.length > 0) {
    cityCards[cityCards.length - 1].focus();
  }
};
</script>

<style scoped>
.search-bar {
  position: relative;
}
</style>
