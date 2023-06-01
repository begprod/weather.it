<template>
  <label
    for="search"
    class="mb-2 text-sm sr-only dark:text-white"
  >
    {props.label}
  </label>
  <div class="relative">
    <input
      class="block w-full pt-3 pr-5 pb-3 pl-5 text-xl text-gray-900 border-none shadow-sm shadow-gray-200 rounded-xl bg-white transition-shadow duration-300 hover:shadow-lg focus:shadow-2xl focus:outline-none appearance-none"
      id="search"
    />
<!--      type={props.type}-->
<!--      placeholder={props.placeholder}-->
<!--      value={props.value}-->
<!--      required={props.required}-->
<!--      autoComplete={props.autoComplete}-->
<!--    autoFocus-->
<!--    />-->
    <div className="absolute hidden sm:flex inset-y-0 right-0 items-center pr-5 pointer-events-none z-20">
      <v-icon name="io-search" class="w-8 h-8 opacity-30" />
    </div>
  </div>
</template>
