<script setup lang="ts">
import { useProjectStore } from '~/store/project';

const projectStore = useProjectStore();
</script>

<template>
  <div class="h-[calc(100vh-178px)]">
    <template v-if="projectStore.projects.length > 0">
      <div class="flex gap-5 flex-wrap">
        <HomeProjectCard v-for="project in projectStore.projects" :key="project.id" :project="project" />
      </div>
    </template>
    <template v-else>
      <HomeEmptyState />
    </template>
  </div>
</template>
