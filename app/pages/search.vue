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

      <div
        v-if="allProjectData.length > 0"
        class="grid grid-cols-1 min-[400px]:grid-cols-2 justify-items-center w-max max-w-full mx-auto 5xl:flex lg:grid-cols-3 min-2xl:grid-cols-4 gap-5 lg:gap-7.5 min-[1920px]:grid-cols-5"
      >
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
