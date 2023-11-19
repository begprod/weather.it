<template>
  <button :class="classObject" :type="buttonType" :title="title" @click="onClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  buttonType?: 'button' | 'submit' | 'reset';
  title: string;
  view?: 'rounded' | 'transparent';
}

const props = withDefaults(defineProps<IProps>(), {
  buttonType: 'button',
  view: 'rounded',
});

const emit = defineEmits(['click']);

const classObject = computed(() => {
  return {
    'bg-white border rounded-full p-3 md:p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300':
      props.view === 'rounded',
    'bg-transparent border-none': props.view === 'transparent',
  };
});

const onClick = () => {
  emit('click');
};
</script>
