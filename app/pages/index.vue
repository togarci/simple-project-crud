<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { useProjectStore, type Project } from '~/store/project';
import { useWishListeStore } from '~/store/wishlist';

const projectStore = useProjectStore();
const wishListStore = useWishListeStore();

const isWishListActive = ref(false);
const allProjectData = computed(() => {
  let dataToReturn = JSON.parse(JSON.stringify(projectStore.projects));

  if (isWishListActive.value)
    dataToReturn = dataToReturn.filter((project: Project) => wishListStore.wishlist.includes(project.id));

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
        <HomeHeader v-model:wishList="isWishListActive" :projectCount="projectStore.projects.length" />

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
