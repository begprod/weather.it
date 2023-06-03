<template>
  <div class="relative flex flex-col w-full min-h-[350px] p-10 bg-white rounded-[20px] shadow-md overflow-hidden isolate">
    <div class="relative z-30">
      <div class="animate-pulse flex flex-col w-full mt-4">
        <div class="w-5/6 h-4 bg-gray-300 rounded" />
        <div class="w-1/6 h-4 bg-gray-300 rounded mt-2" />
        <div class="w-1/6 h-20 mt-5 bg-gray-300 rounded" />
      </div>
      <div class="animate-pulse flex flex-col w-full mt-4">
        <div class="w-1/3 h-4 bg-gray-300 rounded" />
        <div class="w-1/2 h-4 mt-2 bg-gray-300 rounded" />
      </div>
      <div class="animate-pulse flex flex-col w-full mt-4">
        <div class="w-[75px] h-[75px] mt-2 bg-gray-300 rounded-[20px]" />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
    <div
      class="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center"
    />
  </div>
</template>

<script setup lang="ts"></script>
