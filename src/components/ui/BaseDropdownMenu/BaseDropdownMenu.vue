<template>
  <div
    class="relative transition-all duration-300 ease-in-out"
    v-click-outside="closeMenu"
    @keydown.esc="closeMenu"
  >
    <BaseButton
      view="transparent"
      :title="isMenuOpen ? 'Menu is open' : 'Menu is closed'"
      data-test-id="dropdown-menu-button"
      @click="toggleMenu"
    >
      <EllipsisVertical class="w-7 h-7" />
    </BaseButton>
    <div
      v-if="isMenuOpen"
      class="absolute right-0 top-full min-w-[150px] rounded-xl shadow-sm bg-white overflow-hidden z-10 transition-all duration-300"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EllipsisVertical } from 'lucide-vue-next';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';

interface IProps {
  isMenuOpen: boolean;
}

defineProps<IProps>();

const emits = defineEmits(['toggleMenu', 'closeMenu']);

const toggleMenu = () => {
  emits('toggleMenu');
};

const closeMenu = () => {
  emits('closeMenu');
};
</script>
