<template>
  <div class="search-input">
    <input
      ref="input"
      class="search-input__field"
      :id="id"
      :type="type"
      :required="required"
      :autoComplete="autoComplete"
      :value="modelValue"
      :autofocus="autofocus"
      @input="onUpdateValue"
      data-test-id="search-input"
    />
    <div class="search-input__placeholder" data-test-id="search-input-placeholder">
      <span class="search-input__placeholder-text">{{ placeholder }}</span>
      <div class="search-input__key-tip">cmd/ctrl + k</div>
    </div>

    <Search class="search-input__search-icon icon icon_lg" />
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

<style scoped>
.search-input {
  position: relative;
  container-type: inline-size;

  @container (max-width: 499px) {
    .search-input__key-tip {
      display: none;
    }
  }

  @container (max-width: 375px) {
    .search-input__search-icon {
      display: none;
    }
  }
}

.search-input__field {
  padding: 0.75rem 4rem 0.75rem 1.25rem;
  width: 100%;
  font-size: var(--typo-size-xl);
  line-height: 1.5;
  color: var(--gray-900);
  background-color: var(--white);
  border-radius: 0.75rem;
  border: none;
  appearance: none;
  box-shadow: 0 1px 2px 0 var(--gray-200);
  transition: 0.3s ease-in-out;
  transition-property: box-shadow;

  &:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    outline: none;
  }

  &:valid {
    ~ .search-input__placeholder {
      opacity: 0;
    }
  }
}

.search-input__placeholder {
  position: absolute;
  top: 50%;
  left: 1.25rem;
  display: flex;
  align-items: center;
  max-width: 85%;
  font-size: var(--typo-size-xl);
  color: var(--gray-900);
  transform: translateY(-50%);
  user-select: none;
  pointer-events: none;
  transition: 0.3s ease-in-out;
  transition-property: opacity;
  opacity: 0.4;
}

.search-input__placeholder-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-input__key-tip {
  margin-left: 1rem;
  padding: 0.25rem;
  font-size: var(--typo-size-sm);
  border: 1px solid var(--slate-500);
  border-radius: 0.375rem;
  opacity: 0.4;
}

.search-input__search-icon {
  position: absolute;
  top: 50%;
  right: 1.25rem;
  opacity: 0.4;
  transform: translateY(-50%);
}
</style>
