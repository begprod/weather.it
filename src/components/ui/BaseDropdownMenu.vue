<template>
  <div class="relative" v-click-outside="closeMenu">
    <button class="pl-3 pb-3" type="button" @click="toggleMenu">
      <v-icon name="hi-dots-vertical" class="w-7 h-7" />
    </button>
    <div
      v-if="isMenuOpen"
      class="absolute right-0 top-full min-w-[180px] border border-neutral-200 text-neutral-600 rounded-xl shadow-sm bg-white overflow-hidden z-10 transition-all duration-300"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
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
