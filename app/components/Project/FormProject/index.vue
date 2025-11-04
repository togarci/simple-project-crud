<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import projectSchema from './schema';
import type { Project } from '~/store/project';

const emit = defineEmits(['submit']);
const props = defineProps<{
  initFormValues?: Project;
}>();

const { handleSubmit, resetForm } = useForm<{
  name: string;
  client: string;
  startDate: string;
  endDate: string;
}>({
  validationSchema: projectSchema,
  initialValues: props.initFormValues || {
    name: '',
    client: '',
  },
});

const image = ref<any>(null);
const { value: projectName, errorMessage: projectNameFormError } = useField('name');
const { value: projectClient, errorMessage: projectClientFormError } = useField('client');
const { value: projectStartDate, errorMessage: projetcStartDateFormError } = useField('startDate');
const { value: projectEndDate, errorMessage: projectEndDateFormError } = useField('endDate');

const checkAllFields = computed(() => {
  return !(projectName.value && projectClient.value && projectStartDate.value && projectEndDate.value);
});

const handleClearForm = () => {
  resetForm();
  image.value = null;
};

const submit = handleSubmit((values) => {
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

  emit('submit', body);
});

defineExpose({
  handleClearForm,
});

onMounted(() => {
  if (props.initFormValues?.image) {
    image.value = props.initFormValues.image;
  }
});
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col max-w-[702px] w-full gap-5">
    <Text v-model="projectName" :error="projectNameFormError" name="project_name" label="Nome do Projeto" required />
    <Text v-model="projectClient" :error="projectClientFormError" name="client" label="Cliente" required />

    <div class="flex max-md:flex-col gap-5">
      <Date
        v-model="projectStartDate"
        :error="projetcStartDateFormError"
        name="start_date"
        label="Data de Início"
        required
      >
        <StartCalendarSVG />
      </Date>
      <Date v-model="projectEndDate" :error="projectEndDateFormError" name="end_date" label="Data de Término" required>
        <EndCalendarSVG />
      </Date>
    </div>

    <File :limitMbSize="5" v-model="image" data-testid="input-file" />

    <Button size="lg" type="submit" :disabled="checkAllFields"> Salvar projeto </Button>
  </form>
</template>
