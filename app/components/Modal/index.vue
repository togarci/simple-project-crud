<script lang="ts" setup>
defineProps<{
  title: string;
}>();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'Submit'): void;
}>();

const modalRef: any = ref(null);
const isOpenModal = defineModel('isOpenModal');

const handleEsc = (evt: KeyboardEvent) => {
  if (evt.key === 'Escape') isOpenModal.value = false;
};

const handleClick = (evt: any) => {
  const eventClick: any = evt.target;
  if (modalRef.value && !modalRef.value.contains(eventClick)) isOpenModal.value = false;
};

onMounted(() => {
  window.addEventListener('keydown', handleEsc);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc);
});
</script>

<template>
  <section
    data-testId="simple-modal"
    v-if="isOpenModal"
    @click="handleClick"
    class="fixed flex items-center z-50 bg-[#18181890] justify-center top-0 right-0 w-screen h-screen"
  >
    <div
      ref="modalRef"
      class="bg-white max-md:justify-between p-8 max-md:w-full relative max-md:h-full md:min-w-[582px] flex flex-col rounded-lg"
    >
      <div data-testId="content-icon" class="flex justify-center absolute left-0 w-full -top-8">
        <div
          v-if="slots.icon"
          class="bg-primary-500 shadow-custom-100 rounded-full size-16 flex items-center justify-center"
        >
          <slot name="icon"></slot>
        </div>
      </div>

      <header class="w-full border-b pb-5 border-neutral-300" :class="{ 'pt-3': slots.icon }">
        <h1 class="text-[22px] text-center font-semibold text-primary-900">{{ title }}</h1>
      </header>

      <div @click.stop class="flex-1 max-h-[50vh] overflow-y-auto">
        <slot></slot>
      </div>

      <footer class="flex justify-between gap-5 items-center">
        <Button @click="isOpenModal = false" size="lg" variant="secondary"> Cancelar </Button>
        <Button @click="emits('Submit')" size="lg"> Confirmar </Button>
      </footer>
    </div>
  </section>
</template>
