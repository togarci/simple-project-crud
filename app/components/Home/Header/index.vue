<script lang="ts" setup>
defineProps<{
  projectCount: number;
}>();

const favorite = ref(false);
</script>

<template>
  <div class="w-full flex justify-between">
    <h1 class="text-primary-900 font-semibold text-2xl">Projetos ({{ projectCount }})</h1>

    <div class="flex gap-5">
      <Switch label="Apenas Favoritos" v-model="favorite" />
    </div>
  </div>
</template>
