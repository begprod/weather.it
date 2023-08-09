<template>
  <div
    class="relative flex flex-col w-full h-full p-10 bg-white rounded-[20px] shadow-md overflow-hidden isolate"
  >
    <div class="relative z-30">
      <div class="flex flex-col w-full mb-4 animate-pulse">
        <div class="w-5/12 h-5 bg-gray-300 rounded" />
        <div class="w-3/12 h-2 bg-gray-300 rounded mt-2" />
      </div>
      <div class="flex flex-row w-full mb-6 animate-pulse">
        <div class="w-3/12 h-20 mr-2 bg-gray-300 rounded" />
        <div class="w-1/12 h-10 bg-gray-300 rounded" />
      </div>
      <div class="flex flex-col w-full mb-4 animate-pulse">
        <div class="w-6/12 h-4 bg-gray-300 rounded" />
        <div class="w-3/12 h-4 mt-3 bg-gray-300 rounded" />
        <div class="w-4/12 h-4 mt-3 bg-gray-300 rounded" />
      </div>
      <div class="flex flex-col w-full mb-4 animate-pulse">
        <div class="w-[75px] h-[75px] mt-2 bg-gray-300 rounded-[20px]" />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
    <div class="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center" />
  </div>
</template>
