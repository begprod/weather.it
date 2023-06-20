<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[272px] z-50">
    <Transition name="slide-up">
      <div
        v-if="isVisible"
        class="flex items-center w-full sm:w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm shadow-gray-200 duration-300 hover:shadow-lg"
        :class="classObject"
        @click="clickHandler"
      >
        <div
          v-if="props.type === 'success'"
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-200 rounded-lg"
        >
          <v-icon name="md-doneall-outlined" />
        </div>
        <div
          v-if="props.type === 'error'"
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-200 rounded-lg"
        >
          <v-icon name="md-notinterested-outlined" />
        </div>

        <div class="ml-3 text-sm font-normal">{{ message }}</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  type?: string;
  message: string;
  isVisible: boolean;
  clickHandler: () => void;
}

const props = defineProps<IProps>();
const classObject = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
});
</script>
