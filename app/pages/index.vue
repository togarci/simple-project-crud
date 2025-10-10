<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { useProjectStore } from '~/store/project';

const projectStore = useProjectStore();

const deleteProject = (projectId: string) => {
  try {
    projectStore.removeFromData(projectId);
    toast.success('Projeto deletado com sucesso.');
  } catch (error) {
    toast.error('Falha ao deletar projeto.');
  }
};
</script>

<template>
  <div class="h-[calc(100vh-178px)]">
    <template v-if="projectStore.projects.length > 0">
      <div class="flex flex-col items-center gap-7">
        <HomeHeader :projectCount="projectStore.projects.length" />

        <div class="flex w-full gap-5 flex-wrap">
          <HomeProjectCard
            v-for="project in projectStore.projects"
            :key="project.id"
            :project="project"
            @hendleDelete="deleteProject"
            data-testid="project-card"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <HomeEmptyState />
    </template>
  </div>
</template>
