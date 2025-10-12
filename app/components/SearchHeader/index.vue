<script lang="ts" setup>
const model = defineModel('searchQ');
</script>

<template>
  <header class="w-full flex items-center h-[78px] px-10 gap-5 shadow-custom-100 bg-white">
    <IconSearch className="fill-none text-primary-500 size-5" />
    <input
      v-model="model"
      type="text"
      class="flex-1 text-primary-950 text-lg font-normal"
      placeholder="Buscar projeto"
    />
  </header>
</template>
