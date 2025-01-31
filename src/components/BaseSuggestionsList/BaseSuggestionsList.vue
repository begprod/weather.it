<template>
  <Transition name="slide-down">
    <div
      v-if="isEmpty || isLoading || listItems.length"
      class="absolute left-0 top-full w-full h-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-y-hidden"
      :style="{ height: `${listItemHeight}px`, minHeight: '48px' }"
      data-test-id="suggestions-list"
    >
      <Transition name="fade">
        <div v-if="isEmpty" class="absolute w-full h-full select-none" data-test-id="empty-message">
          <div class="flex items-center justify-center h-[48px]">
            <MapPinOff class="w-6 h-6 mr-2 opacity-90" />

            <div class="text-xl overflow-hidden">
              <p class="text-xl">City not found</p>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="isLoading"
          class="absolute w-full h-full min-h-[48px] select-none overflow-hidden"
          data-test-id="loader"
        >
          <div
            class="animate-spin spin-slow flex items-center justify-center h-[48px] animation-duration-2000"
          >
            <RefreshCcw class="w-6 h-6 opacity-50" />
          </div>
        </div>
      </Transition>

      <Transition name="slide-up">
        <ul
          v-if="!isLoading && !isEmpty"
          class="flex flex-col w-full h-auto max-h-96"
          data-test-id="items-list-slot"
        >
          <li
            v-for="(item, index) in listItems"
            ref="listItemsRef"
            :key="item.id"
            class="flex items-center bg-gray-100 hover:bg-slate-200 focus:bg-slate-300 focus:outline-none"
            tabindex="0"
            @click="onItemClickHandler(item)"
            @keydown.down.prevent="nextListItem(index)"
            @keydown.up.prevent="previousListItem(index)"
            @keydown.enter.prevent="onItemClickHandler(item)"
            data-test-id="suggestion-item"
          >
            <div
              class="group flex items-center w-full p-2 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div
                class="flex flex-col items-center justify-center mr-2 opacity-40 overflow-hidden"
              >
                <MapPin
                  class="w-5 h-5 fill-red-50 group-hover:translate-y-1 transition-transform duration-300"
                />
                <Earth
                  class="w-5 h-5 translate-y-5 group-hover:-translate-y-1 group-hover:opacity-100 transition-transform duration-300"
                />
              </div>
              <div class="text-xl overflow-hidden">
                <p class="truncate" data-test-id="suggestion-city-name">{{ item.name }}</p>
                <p class="text-sm truncate" data-test-id="suggestion-city-country">
                  {{ item.country }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ISearchSuggestItem } from '@/types';
import { ref, watch } from 'vue';
import { MapPinOff, RefreshCcw, MapPin, Earth } from 'lucide-vue-next';

interface IProps {
  listItems: Array<ISearchSuggestItem>;
  isLoading: boolean;
  isEmpty: boolean;
}

defineProps<IProps>();

const emit = defineEmits(['item-click']);

const listItemsRef = ref<Array<HTMLElement> | null>(null);
const listItemHeight = ref(0);

watch(
  listItemsRef,
  () => {
    listItemHeight.value = 0;
    listItemsRef.value?.[0]?.focus();

    listItemsRef.value?.forEach((item) => {
      listItemHeight.value += item.offsetHeight;
    });
  },
  {
    deep: true,
  },
);

const onItemClickHandler = (item: ISearchSuggestItem) => {
  emit('item-click', item);
};

const nextListItem = (index: number) => {
  listItemsRef.value?.[index + 1]?.focus();
};

const previousListItem = (index: number) => {
  listItemsRef.value?.[index - 1]?.focus();
};
</script>
