<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <div class="flex flex-col min-h-screen w-full">
    <Header :showSearch="route.meta.showSearch ?? true" />
    <div class="px-4 flex-1 max-w-[1920px] md:px-8">
      <slot></slot>
    </div>
  </div>
</template>
