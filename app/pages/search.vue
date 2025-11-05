<script lang="ts" setup>
import { useProjectStore } from '~/store/project';

definePageMeta({
  layout: false,
});

const projectStore = useProjectStore();

const searchQ = ref('');
const allProjectData = computed(() =>
  projectStore.projects.filter((project) => project.name.toLowerCase().includes(searchQ.value.toLowerCase()))
);
</script>

<template>
  <div>
    <Search v-model:searchQ="searchQ" />
    <section class="px-8 py-6 md:py-12 flex min-h-[calc(100vh-178px)] flex-col gap-7">
      <PageHeader title="Resultado da busca" />

      <div v-if="allProjectData.length > 0" class="flex flex-wrap max-lg:justify-center gap-4 sm:gap-5 lg:gap-7.5">
        <ProjectCard
          v-for="project in allProjectData"
          :key="project.id"
          :project="project"
          data-testid="project-card"
        />
      </div>

      <EmptyState v-else />
    </section>
  </div>
</template>
