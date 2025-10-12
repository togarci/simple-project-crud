<script lang="ts" setup>
import { useProjectStore } from '~/store/project';

definePageMeta({
  layout: false,
});

const projectStore = useProjectStore();

const searchQ = ref('');
const allProjectData = computed(() => projectStore.projects.filter((project) => project.name.includes(searchQ.value)));
</script>

<template>
  <div>
    <SearchHeader v-model:searchQ="searchQ" />
    <section class="px-8 py-12 flex flex-col gap-7">
      <PageHeader title="Resultado da busca" />

      <div class="flex w-full gap-5 flex-wrap">
        <HomeProjectCard
          v-for="project in allProjectData"
          :key="project.id"
          :project="project"
          data-testid="project-card"
        />
      </div>
    </section>
  </div>
</template>
