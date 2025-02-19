<template>
  <Transition name="slide-down">
    <div
      v-if="isLoading || isEmpty || listItems.length"
      class="suggestions"
      :style="{ height: `${listItemHeight}px`, minHeight: '50px' }"
      data-test-id="suggestions"
    >
      <Transition name="fade">
        <div v-if="isEmpty" class="suggestion-list__message" data-test-id="empty-message">
          <MapPinOff class="icon icon_lg" />
          <span>City not found</span>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="isLoading" class="suggestion-list__message" data-test-id="loader">
          <div class="animate-spin">
            <RefreshCcw class="icon icon_lg" />
          </div>
        </div>
      </Transition>

      <Transition name="slide-up">
        <ul v-if="!isLoading && !isEmpty" class="suggestions__list">
          <li
            v-for="(item, index) in listItems"
            :key="item.id"
            ref="listItemsRef"
            class="suggestion-list__item"
            tabindex="0"
            @click="onItemClickHandler(item)"
            @keydown.down.prevent="nextListItem(index)"
            @keydown.up.prevent="previousListItem(index)"
            @keydown.enter.prevent="onItemClickHandler(item)"
            data-test-id="suggestion-item"
          >
            <div class="suggestion-list__icons">
              <MapPin class="icon icon_md" />
              <Earth class="icon icon_md" />
            </div>

            <div class="suggestion-list__description">
              <p class="suggestion-list__city-name" data-test-id="suggestion-city-name">
                {{ item.name }}
              </p>
              <p class="suggestion-list__country-name" data-test-id="suggestion-city-country">
                {{ item.country }}
              </p>
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

<style scoped>
.suggestions {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 100%;
  background-color: var(--gray-100);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 var(--gray-200);
  overflow-y: hidden;
  z-index: 50;
}

.suggestions__list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.suggestion-list__message {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: var(--typo-size-xl);
  overflow: hidden;
  user-select: none;
}

.suggestion-list__item {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--gray-100);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  transition-property: background-color;
  overflow: hidden;

  &:hover {
    background-color: var(--slate-200);

    .suggestion-list__icons {
      svg {
        &:nth-child(1) {
          transform: translateY(4px);
        }

        &:nth-child(2) {
          transform: translateY(0px);
        }
      }
    }
  }

  &:focus {
    background-color: var(--slate-300);
    outline: none;

    .suggestion-list__icons {
      svg {
        &:nth-child(1) {
          transform: translateY(4px);
        }

        &:nth-child(2) {
          transform: translateY(0px);
        }
      }
    }
  }
}

.suggestion-list__icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 0.5rem;
  padding-left: 0.5rem;
  opacity: 0.4;

  svg {
    transition: 0.3s ease-in-out;
    transition-property: transform;

    &:nth-child(1) {
      transform: translateY(-5px);
    }

    &:nth-child(2) {
      transform: translateY(40px);
    }
  }
}

.suggestion-list__description {
  padding: 0.5rem 0.5rem 0.5rem 0;
  font-size: var(--typo-size-xl);
  overflow: hidden;
}

.suggestion-list__city-name {
  font-size: var(--typo-size-xl);
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggestion-list__country-name {
  font-size: var(--typo-size-sm);
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
