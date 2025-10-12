<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <div class="flex flex-col size-full">
    <LayoutHeader :showSearch="route.meta.showSearch ?? true" />
    <div class="px-8 py-12">
      <slot></slot>
    </div>
  </div>
</template>
