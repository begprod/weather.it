<template>
  <div class="toast" :class="classObject" @click="onClick" data-test-id="toast">
    <div class="toast__inner">
      <div v-if="props.type === 'success'" class="toast__icon" data-test-id="toast-success-icon">
        <ThumbsUp class="icon icon_md" />
      </div>

      <div v-if="props.type === 'error'" class="toast__icon" data-test-id="toast-error-icon">
        <TriangleAlert class="icon icon_md" />
      </div>

      <div class="toast__message" data-test-id="toast-message">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ThumbsUp, TriangleAlert } from 'lucide-vue-next';
import { computed } from 'vue';

interface IProps {
  type?: 'init' | 'loading' | 'updating' | 'success' | 'error';
  message: string;
}

const props = defineProps<IProps>();

const emit = defineEmits(['click']);

const classObject = computed(() => {
  switch (props.type) {
    case 'success':
      return 'toast_success';
    case 'error':
      return 'toast_error';
    default:
      return 'toast_default';
  }
});

const onClick = () => {
  emit('click');
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 2rem;
  padding: 1rem;
  width: 100%;
  max-width: 16rem;
  color: var(--gray-500);
  border-radius: 0.5rem;
  background-color: var(--white);
  box-shadow: 0 1px 2px 0 var(--gray-200);
  transition: all 0.3s ease-in-out;
  z-index: 50;

  &:hover {
    box-shadow: 0 0 0 0 var(--gray);
  }
}

.toast_success {
  color: var(--green-500);

  .toast__icon {
    background-color: var(--green-200);
  }
}

.toast_error {
  color: var(--red-500);

  .toast__icon {
    background-color: var(--red-200);
  }
}

.toast_default {
  color: var(--gray-500);
}

.toast__inner {
  display: flex;
  gap: 0.5rem;
}

.toast__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
}

.toast__message {
  font-size: var(--typo-size-sm);
  word-break: break-word;
}
</style>
