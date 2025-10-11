<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { useProjectStore, type Project } from '~/store/project';

const projectStore = useProjectStore();

const formRef: any = ref(null);

const handleSubmit = (body: Project) => {
  try {
    projectStore.addToData(body);

    formRef.value?.handleClearForm();
    toast.success('Projeto criado com sucesso.');
  } catch (error) {
    formRef.value?.handleClearForm();
    toast.error('Falha ao criar projeto.');
  }
};
</script>

<template>
  <div class="flex flex-col gap-7 w-full">
    <ProjectHeader />
    <div class="rounded-lg border border-neutral-200 flex justify-center w-full py-7">
      <ProjectForm ref="formRef" @submit="handleSubmit" />
    </div>
  </div>
</template>
