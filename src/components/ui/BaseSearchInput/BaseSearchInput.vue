<template>
  <label :for="id" class="sr-only mb-2 text-sm dark:text-white">
    {{ label }}
  </label>
  <div class="relative">
    <input
      ref="input"
      class="input block w-full pt-3 pr-5 pb-3 pl-5 text-xl text-gray-900 border-none shadow-sm shadow-gray-200 rounded-xl bg-white transition-shadow duration-300 hover:shadow-lg focus:shadow-2xl focus:outline-none appearance-none"
      :id="id"
      :type="type"
      :required="required"
      :autoComplete="autoComplete"
      :value="modelValue"
      :autofocus="autofocus"
      @input="onUpdateValue"
      data-test-id="search-input"
    />
    <div
      class="placeholder absolute top-2/4 left-5 right-5 -translate-y-2/4 flex items-center text-lg md:text-xl text-gray-900 opacity-40 transition-opacity duration-300 select-none pointer-events-none"
      data-test-id="search-input-placeholder"
    >
      <span class="whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ placeholder }}
      </span>
      <div
        class="hidden sm:flex items-center ml-4 p-1 text-sm border border-slate-500 rounded-md opacity-50"
      >
        cmd/ctrl + k
      </div>
    </div>
    <div
      class="absolute hidden sm:flex inset-y-0 right-0 items-center pr-5 pointer-events-none z-20"
    >
      <Search class="w-6 h-6 opacity-60" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Search } from 'lucide-vue-next';

interface IProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  modelValue: string;
  required?: boolean;
  autoComplete?: string;
  autofocus?: boolean;
}

defineProps<IProps>();

const emits = defineEmits(['update:modelValue']);

const input = ref<HTMLInputElement | null>(null);

onBeforeMount(() => {
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey === true || event.ctrlKey == true) && event.code === 'KeyK') {
      event.preventDefault();

      input.value?.focus();
    }
  });
});

const onUpdateValue = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<style scoped lang="scss">
.input {
  &:valid {
    ~ .placeholder {
      opacity: 0;
    }
  }
}
</style>
