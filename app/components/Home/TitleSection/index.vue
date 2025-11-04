<script lang="ts" setup>
defineProps<{
  projectCount: number;
}>();

const wishList = defineModel<boolean>('wishList');
const sortBy = defineModel<string | null>('sortBy');

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
  <div class="w-full mx-auto flex max-lg:flex-wrap gap-5 justify-between">
    <div class="flex w-full justify-between">
      <h1 class="text-primary-900 font-semibold text-xl text-nowrap md:text-2xl">Projetos ({{ projectCount }})</h1>

      <NuxtLink class="lg:hidden" to="/project/create">
        <Button>
          <CirclePlusSVG />
          <span class="text-base text-nowrap"> Novo </span>
        </Button>
      </NuxtLink>
    </div>

    <div class="flex max-lg:ml-auto max-sm:flex-wrap flex-row-reverse lg:flex-row gap-5">
      <Switch label="Apenas Favoritos" v-model="wishList" />

      <Select :options="options" v-model="sortBy" />

      <NuxtLink class="max-lg:hidden" to="/project/create">
        <Button>
          <CirclePlusSVG />
          <span class="text-base text-nowrap"> Novo Projeto </span>
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>
