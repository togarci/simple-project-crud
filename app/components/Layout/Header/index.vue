<script setup lang="ts">
const { showSearch = true } = defineProps<{
  showSearch?: any;
}>();
</script>

<template>
  <header
    class="flex w-full border relative border-black items-center justify-center bg-primary-950 shadow-custom py-[3px]"
  >
    <NuxtLink href="/">
      <div class="flex items-center gap-2.5">
        <NuxtImg data-testId="header-img-logo" src="/favicon.svg" alt="logo" class="size-14 md:size-18" />
        <h1 class="font-normal w-28 text-white text-base md:text-lg">Gerenciador de Projetos</h1>
      </div>
    </NuxtLink>

    <NuxtLink
      v-if="showSearch"
      to="/search"
      class="absolute h-full w-10 flex items-center justify-center right-10 cursor-pointer"
      type="button"
    >
      <SearchSVG />
    </NuxtLink>
  </header>
</template>
