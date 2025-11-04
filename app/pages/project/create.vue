<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { useProjectStore, type Project } from '~/store/project';

definePageMeta({
  layout: 'default',
  showSearch: false,
});

const projectStore = useProjectStore();
const router = useRouter();

const formRef: any = ref(null);

const handleSubmit = (body: Project) => {
  try {
    projectStore.addToData(body);

    formRef.value?.handleClearForm();
    toast.success('Projeto criado com sucesso.');
    router.push('/');
  } catch (error) {
    formRef.value?.handleClearForm();
    toast.error('Falha ao criar projeto.');
  }
};
</script>

<template>
  <div class="flex flex-col py-6 md:py-12 gap-7 w-full">
    <PageHeader title="Novo Projeto" />
    <div class="rounded-lg lg:border border-neutral-200 flex justify-center w-full py-7">
      <FormProject ref="formRef" @submit="handleSubmit" />
    </div>
  </div>
</template>
