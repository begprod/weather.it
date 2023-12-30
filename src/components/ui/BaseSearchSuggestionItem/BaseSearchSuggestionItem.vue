<template>
  <li class="flex items-center" @click="onClick">
    <div
      class="group flex items-center w-full p-2 bg-gray-100 hover:bg-gray-200 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div class="flex flex-col items-center justify-center mr-2 opacity-40 overflow-hidden">
        <MapPinIcon class="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
        <GlobeAsiaAustraliaIcon
          class="w-5 h-5 translate-y-5 group-hover:-translate-y-1 group-hover:opacity-100 transition-transform duration-300"
        />
      </div>
      <div class="text-xl overflow-hidden">
        <p class="truncate">{{ name }}</p>
        <p class="text-sm truncate">{{ country }}</p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { MapPinIcon, GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/solid';

interface IProps {
  name: string;
  country: string;
}

defineProps<IProps>();

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>
