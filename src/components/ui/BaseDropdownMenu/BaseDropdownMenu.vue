<template>
  <div class="drop-down" v-click-outside="closeMenu" @keydown.esc="closeMenu">
    <BaseButton
      view="transparent"
      :title="isMenuOpen ? 'Menu is open' : 'Menu is closed'"
      @click="toggleMenu"
      data-test-id="dropdown-menu-trigger"
    >
      <EllipsisVertical class="icon icon_lg" />
    </BaseButton>
    <Transition name="slide-down">
      <div v-if="isMenuOpen" class="drop-down__menu">
        <slot></slot>
      </div>
    </Transition>
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

<style scoped>
.drop-down-menu {
  position: relative;
  border: 1px solid red;
  transition: 0.3s ease-in-out;
}

.drop-down__menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 150px;
  border-radius: 0.75rem;
  background-color: var(--white);
  box-shadow: 0 0 0 0 var(--gray);
}
</style>
