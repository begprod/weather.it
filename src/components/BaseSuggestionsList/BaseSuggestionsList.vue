<template>
  <div
    v-if="isLoading || isEmpty || isItemsListVisible"
    class="absolute left-0 top-full w-full min-h-[48px] bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-y-auto"
  >
    <Transition name="fade">
      <div v-if="isEmpty" class="absolute w-full h-full select-none">
        <div class="flex items-center justify-center h-[48px]">
          <v-icon name="md-locationoff-twotone" class="w-6 h-6 mr-3 opacity-30" />
          <div class="text-xl overflow-hidden">
            <p class="text-xl">City not found</p>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isLoading" class="absolute w-full h-full select-none overflow-hidden">
        <div
          class="animate-spin spin-slow flex items-center justify-center h-[48px] animation-duration-2000"
        >
          <v-icon name="ri-loader-line" class="w-6 h-6 opacity-30" />
        </div>
      </div>
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="!isLoading && !isEmpty && isItemsListVisible"
        class="flex flex-col w-full h-auto max-h-96"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  isItemsListVisible: boolean;
  isLoading: boolean;
  isEmpty: boolean;
}

defineProps<IProps>();
</script>
