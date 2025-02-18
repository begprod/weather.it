<template>
  <button
    class="button"
    :class="classObject"
    :type="type"
    :title="title"
    :data-test-id="dataTestId"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  view?: 'rounded' | 'transparent';
  text?: 'alert';
  dataTestId?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  view: 'rounded',
});

const emit = defineEmits(['click']);

const classObject = computed(() => {
  return {
    button_view_rounded: props.view === 'rounded',
    button_view_transparent: props.view === 'transparent',
    button_text_alert: props.text === 'alert',
  };
});

const onClick = () => {
  emit('click');
};
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: clamp(0.75rem, 3.65vw, 1.25rem);
  border: 1px solid var(--gray);
  background-color: var(--white);
  box-shadow: 0 1px 2px 0 var(--gray-200);
}

.button_view_rounded {
  border-radius: 100%;
  transition: 0.3s ease-in-out;
  transition-property: transform, box-shadow;

  &:hover {
    transform: rotate(45deg);
    box-shadow: 0 0 0 0 var(--gray);
  }

  &:focus {
    box-shadow: 0 1px 2px 0 var(--gray-200);
  }
}

.button_view_transparent {
  padding: clamp(0.5rem, 1.56vw, 0.75rem);
  border: none;
  box-shadow: none;
  background-color: transparent;
}

.button_text_alert {
  color: var(--red-600);
}
</style>
