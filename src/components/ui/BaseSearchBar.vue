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
      autofocus
    />

    <Transition name="fade">
      <div
        v-if="!isSearching && citiesSuggestions.length === 0 && searchQuery.length !== 0"
        class="absolute min-h-[52px] left-0 top-full w-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-hidden"
      >
        <div class="absolute top-0 left-0 flex items-center justify-center w-full p-3 select-none">
          <v-icon name="md-locationoff-twotone" class="w-6 h-6 mr-3 opacity-30" />
          <div class="text-xl overflow-hidden">
            <p class="text-xl">City not found</p>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        v-if="isSearching && searchQuery.length !== 0"
        class="absolute min-h-[52px] left-0 top-full w-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-hidden"
      >
        <div class="absolute top-0 left-0 flex items-center justify-center w-full p-3">
          <div class="animate-spin">
            <v-icon name="ri-loader-line" class="w-6 h-6 opacity-30" />
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="citiesSuggestions.length > 0 && searchQuery.length !== 0 && !isSearching"
        class="absolute left-0 top-full w-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-hidden"
      >
        <BaseSearchSuggestionItem
          v-for="item in citiesSuggestions"
          :key="item.id"
          :name="item.name"
          :country="item.country"
          @click="getCityWeather(item)"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { type ISearchSuggestItem } from '@/types';
import { watchDebounced } from '@vueuse/core';
import { useCommonStore, useWeatherStore } from '@/stores';
import { suggestionsCitiesService } from '@/services';
import BaseWeatherIconDoodle from '@/components/icons/BaseWeatherIconDoodle.vue';
import BaseSearchInput from '@/components/ui/BaseSearchInput.vue';
import BaseSearchSuggestionItem from '@/components/ui/BaseSearchSuggestionItem.vue';

const commonStore = useCommonStore();
const weatherStore = useWeatherStore();
const searchQuery = ref<string>('');
const isSearching = ref<boolean>(false);
const citiesSuggestions = ref<Array<ISearchSuggestItem>>([]);

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
            return !weatherStore.getIds.includes(city.id);
          });

          isSearching.value = false;
        } else {
          citiesSuggestions.value = [];
          isSearching.value = false;
        }
      })
      .catch(() => {
        isSearching.value = false;
        commonStore.setStatus('error');
        commonStore.setMessage(
          'Something went wrong with the search suggestion. Please try again later.',
        );
        commonStore.showToast();
      });
  },
  { debounce: 1100, maxWait: 5000 },
);

function getCityWeather(suggestionItem: ISearchSuggestItem) {
  isSearching.value = false;
  searchQuery.value = '';
  citiesSuggestions.value = [];

  weatherStore.getCityData(suggestionItem);
}
</script>
