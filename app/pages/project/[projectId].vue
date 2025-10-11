<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { useProjectStore, type Project } from '~/store/project';

const projectStore = useProjectStore();
const route = useRoute();
const router = useRouter();

const projectId = route.params.projectId;
const projectForm = ref<Project>();

const handleSubmit = (body: Project) => {
  try {
    if (!projectForm.value?.id) return;
    projectStore.updateData(projectForm.value.id, body);
    toast.success('Projeto salvo com sucesso.');
    router.push('/');
  } catch (error) {
    toast.error('Falha ao editar projeto.');
  }
};

onMounted(() => {
  if (projectId) {
    const project = projectStore.projects.find((project) => project.id === projectId);

    if (project) {
      projectForm.value = project;
    }
  }
});
</script>

<template>
  <div class="flex flex-col gap-7 w-full">
    <ProjectHeader />
    <div class="rounded-lg border border-neutral-200 flex justify-center w-full py-7">
      <ProjectForm v-if="projectForm" :initFormValues="projectForm" @submit="handleSubmit" />
      <ProjectFormSkeleton v-else />
    </div>
  </div>
</template>
