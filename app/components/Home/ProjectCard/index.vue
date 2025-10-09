<script lang="ts" setup>
defineProps<{
  project: {
    image?: string | null | undefined;
    id: string;
    name: string;
    client: string;
    startDate: string;
    endDate: string;
  };
}>();
</script>

<template>
  <div class="rounded-2xl overflow-hidden">
    <div class="relative">
      <img
        :src="project.image ? project.image : '~/app/assets/image/ProjectCard/Image.png'"
        class="w-[346px] h-[232px] object-contain"
      />

      <div class="flex gap-5">
        <IconStar />
      </div>
    </div>
  </div>
</template>
