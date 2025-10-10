<script lang="ts" setup>
defineProps<{
  projectCount: number;
}>();
</script>

<template>
  <div class="w-full flex justify-between">
    <h1 class="text-primary-900 font-semibold text-2xl">Projetos ({{ projectCount }})</h1>
  </div>
</template>
