<script setup lang="ts">
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
</script>

<template>
  <div class="py-6 md:py-12">
    <template v-if="projectStore.projects.length > 0">
      <div class="flex flex-col gap-7">
        <TitleSection
          v-model:wishList="isWishListActive"
          v-model:sortBy="sortBy"
          :projectCount="projectStore.projects.length"
        />

        <div class="flex flex-wrap max-lg:justify-center gap-4 sm:gap-5 lg:gap-7.5">
          <ProjectCard
            v-for="project in allProjectData"
            :key="project.id"
            :project="project"
            data-testid="project-card"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <EmptyState />
    </template>
  </div>
</template>
