<template>
  <li class="flex items-center">
    <div class="group flex items-center w-full p-2 bg-gray-100 hover:bg-gray-200 transition-all duration-300 overflow-hidden cursor-pointer">
      <div class="flex flex-col items-center justify-center mr-3 opacity-30 overflow-hidden">
        <v-icon name="fa-map-pin" class="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
        <v-icon name="la-globe-asia-solid" class="w-5 h-5 translate-y-5 group-hover:-translate-y-2 group-hover:opacity-100 transition-transform duration-300" />
      </div>
      <div class="text-xl overflow-hidden">
        <p class="truncate">{{name}}</p>
        <p class="text-sm truncate">{{country}}</p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
interface IProps {
  name: string;
  country: string;
}

defineProps<IProps>();
</script>
