<script setup lang="ts">
defineProps<{
  title: string;
}>();
const router = useRouter();

const handleBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <button @click="handleBack" type="button" class="flex cursor-pointer items-center gap-2">
      <IconArrowLeft />
      <span class="text-primary-500 font-normal text-base">Voltar</span>
    </button>

    <h1 class="text-primary-900 font-semibold text-2xl">{{ title }}</h1>
  </div>
</template>
