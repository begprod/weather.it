<template>
  <div
    class="relative flex flex-col w-full h-full p-5 bg-white rounded-[20px] shadow-md overflow-hidden isolate md:p-7 lg:p-10"
  >
    <div class="relative z-30">
      <div class="flex flex-col w-full mt-2 mb-2 animate-pulse md:mb-4">
        <div class="w-5/12 h-5 bg-gray-300 rounded" />
        <div class="w-3/12 h-1 bg-gray-300 rounded mt-2 lg:h-2" />
      </div>
      <div class="flex flex-row w-full mb-3 animate-pulse md:mb-6">
        <div class="w-3/12 h-14 mr-2 bg-gray-300 rounded lg:h-20" />
        <div class="w-1/12 h-10 bg-gray-300 rounded" />
      </div>
      <div class="flex flex-col w-full mb-4 animate-pulse">
        <div class="w-6/12 h-2 bg-gray-300 rounded md:h-4" />
        <div class="w-3/12 h-2 mt-3 bg-gray-300 rounded md:h-4" />
        <div class="w-4/12 h-2 mt-3 bg-gray-300 rounded md:h-4" />
      </div>
      <div class="flex flex-col w-full animate-pulse">
        <div class="w-[60px] h-[60px] bg-gray-300 rounded-[20px] sm:w-[75px] sm:h-[75px]" />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
    <div class="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center" />
  </div>
</template>
