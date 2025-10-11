<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import projectSchema from './schema';
import { useProjectStore } from '~/store/project';
import { toast } from 'vue3-toastify';

const { handleSubmit, resetForm } = useForm<{
  name: string;
  client: string;
  startDate: Date;
  endDate: Date;
}>({
  validationSchema: projectSchema,
  initialValues: {
    name: '',
    client: '',
  },
});

const image = ref(null);
const { value: projectName, errorMessage: projectNameFormError } = useField('name');
const { value: projectClient, errorMessage: projectClientFormError } = useField('client');
const { value: projectStartDate, errorMessage: projetcStartDateFormError } = useField('startDate');
const { value: projectEndDate, errorMessage: projectEndDateFormError } = useField('endDate');

const projectStore = useProjectStore();
const checkAllFields = computed(() => {
  return !(projectName.value && projectClient.value && projectStartDate.value && projectEndDate.value);
});

const submit = handleSubmit((values) => {
  try {
    let body: any = {
      name: values.name,
      client: values.client,
      startDate: values.startDate,
      endDate: values.endDate,
    };

    if (image.value) {
      body = {
        ...body,
        image: image.value,
      };
    }

    projectStore.addToData(body);
    toast.success('Projeto criado com sucesso.');
    image.value = null;
    resetForm();
  } catch (error) {
    toast.error('Falha ao criar projeto.');
  }
});
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col max-w-[702px] w-full gap-5">
    <InputText
      v-model="projectName"
      :error="projectNameFormError"
      name="project_name"
      label="Nome do Projeto"
      required
    />
    <InputText v-model="projectClient" :error="projectClientFormError" name="client" label="Cliente" required />

    <div class="flex gap-5">
      <InputDate
        v-model="projectStartDate"
        :error="projetcStartDateFormError"
        name="start_date"
        label="Data de Início"
        required
      >
        <IconStartCalendar />
      </InputDate>
      <InputDate
        v-model="projectEndDate"
        :error="projectEndDateFormError"
        name="end_date"
        label="Data de Término"
        required
      >
        <IconEndCalendar />
      </InputDate>
    </div>

    <InputFile :limitMbSize="5" v-model="image" data-testid="input-file" />

    <Button size="lg" type="submit" :disabled="checkAllFields"> Salvar projeto </Button>
  </form>
</template>
