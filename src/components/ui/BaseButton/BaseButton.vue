<template>
  <button
    class="button"
    :class="classObject"
    :type="buttonType"
    :title="title"
    @click="onClick"
    :data-test-id="dataTestId"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  buttonType?: 'button' | 'submit' | 'reset';
  title: string;
  view?: 'rounded' | 'transparent';
  dataTestId?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  buttonType: 'button',
  view: 'rounded',
});

const emit = defineEmits(['click']);

const classObject = computed(() => {
  return {
    button_rounded: props.view === 'rounded',
    button_transparent: props.view === 'transparent',
  };
});

const onClick = () => {
  emit('click');
};
</script>

<style scoped>
.button {
  padding: clamp(0.75rem, 3.65vw, 1.25rem);
  border: 1px solid var(--gray);
  background-color: var(--white);
  box-shadow: 0 5px 15px 0 var(--gray);
}

.button_rounded {
  border-radius: 100%;
  transition: 0.3s ease-in-out;
  transition-property: transform, box-shadow;

  &:hover {
    transform: rotate(45deg);
    box-shadow: 0 0 0 0 var(--gray);
  }

  &:focus {
    box-shadow: 0 5px 15px 0 var(--gray);
  }
}

.button_transparent {
  padding: clamp(0.5rem, 1.56vw, 0.75rem);
  border: none;
  box-shadow: none;
  background-color: transparent;
}
</style>
