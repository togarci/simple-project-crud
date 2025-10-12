<script setup lang="ts">
import { data } from 'happy-dom/lib/PropertySymbol.js';
import { toast } from 'vue3-toastify';
import { useProjectStore, type Project } from '~/store/project';
import { useWishListeStore } from '~/store/wishlist';

const projectStore = useProjectStore();
const wishListStore = useWishListeStore();

const isWishListActive = ref(false);
const sortBy = ref<string | null>(null);
const allProjectData = computed(() => {
  let dataToReturn = JSON.parse(JSON.stringify(projectStore.projects));

  if (isWishListActive.value)
    dataToReturn = dataToReturn.filter((project: Project) => wishListStore.wishlist.includes(project.id));

  switch (sortBy.value) {
    case 'alphabetical':
      dataToReturn.sort((a: Project, b: Project) => a.name.localeCompare(b.name));
      break;

    case 'recent':
      dataToReturn.sort((a: Project) => new Date(a.startDate).getTime() - new Date().getTime());
      break;

    case 'deadline':
      dataToReturn.sort((a: Project) => new Date(a.endDate).getTime() - new Date().getTime());
      break;

    default:
      break;
  }

  return dataToReturn ?? [];
});

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
        <HomeHeader
          v-model:wishList="isWishListActive"
          v-model:sortBy="sortBy"
          :projectCount="projectStore.projects.length"
        />

        <div class="flex w-full gap-5 flex-wrap">
          <HomeProjectCard
            v-for="project in allProjectData"
            :key="project.id"
            :project="project"
            @handleDelete="deleteProject"
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
