<script lang="ts" setup>
defineProps<{
  projectCount: number;
}>();

const isFavorite = defineModel<boolean>('isFavorite');
const sortBy = defineModel<string>('sortBy');

const options = [
  {
    text: 'Ordem alfabética',
    value: 'alphabetical',
  },
  {
    text: 'Iniciados mais recentes',
    value: 'recent',
  },
  {
    text: 'Prazo mais próximo',
    value: 'deadline',
  },
];
</script>

<template>
  <div class="w-full flex justify-between">
    <h1 class="text-primary-900 font-semibold text-2xl">Projetos ({{ projectCount }})</h1>

    <div class="flex gap-5">
      <Switch label="Apenas Favoritos" v-model="isFavorite" />

      <Select :options="options" v-model="sortBy" />

      <NuxtLink to="/project/create">
        <Button>
          <IconCirclePlus />
          <span class="text-base text-nowrap"> Novo Projeto </span>
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>
