<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { useProjectStore } from '~/store/project';
import { useWishListeStore } from '~/store/wishlist';
import { formatDateToLong } from '~/utils/formatDate';

const wishListStore = useWishListeStore();
const projectStore = useProjectStore();

const props = defineProps<{
  project: {
    image?: string | null | undefined;
    id: string;
    name: string;
    client: string;
    startDate: string;
    endDate: string;
  };
}>();

const isOpenMenu = ref(false);
const isOpenModal = ref(false);
const menuRef: any = ref(null);
const isFavorite = computed(() => wishListStore.wishlist.includes(props.project.id));

const handleDelete = () => {
  isOpenModal.value = true;
};

const deleteProject = () => {
  try {
    projectStore.removeFromData(props.project.id);
    toast.success('Projeto deletado com sucesso.');
  } catch (error) {
    toast.error('Falha ao deletar projeto.');
  }
};

onMounted(() => {
  window.addEventListener('click', (evt) => {
    if (menuRef.value && !menuRef.value?.contains(evt.target)) isOpenMenu.value = false;
  });
});

const handleWishList = () => {
  isFavorite.value ? wishListStore.removeFromData(props.project.id) : wishListStore.addToData(props.project.id);
};
</script>

<template>
  <div class="w-full min-[400px]:max-w-75 max-w-full xl:max-w-[346px]">
    <Modal @submit="deleteProject" v-model:isOpenModal="isOpenModal" title="Remover projeto">
      <template #icon> <TrashSVG className="size-5 fill-none text-white" /></template>

      <div class="flex flex-col items-center w-full py-10 gap-4">
        <p class="text-neutral-500 font-normal text-center text-base">Essa ação removerá definitivamente o projeto:</p>
        <h1 class="text-primary-950 text-center line-clamp-2 text-wrap max-w-75 text-2xl font-medium">
          {{ project.name }}
        </h1>
      </div>
    </Modal>

    <div class="relative">
      <img
        :src="project.image ? project.image : '/image/ProjectCard/Image.png'"
        class="w-full h-[190px] xl:h-[232px] object-cover rounded-t-2xl"
      />

      <div class="flex items-center absolute bottom-5 h-fit right-5 gap-5">
        <button @click="handleWishList" type="button">
          <StarSVG
            :className="{
              'size-[22px] fill-none text-white': !isFavorite,
              'size-[22px] fill-accent text-white': isFavorite,
            }"
          />
        </button>

        <button
          @click="isOpenMenu = !isOpenMenu"
          ref="menuRef"
          class="bg-white relative shadow-custom flex items-center justify-center size-8 rounded-full"
          type="button"
          data-testId="button-menu"
        >
          <MenuSVG />

          <ul v-if="isOpenMenu" class="absolute shadow-custom-100 rounded-lg bg-white w-[240px] right-0 top-9">
            <li data-testId="edit-option">
              <NuxtLink class="p-3 cursor-pointer flex items-center gap-2" :to="`/project/${project.id}`">
                <div class="size-6 flex items-center justify-center">
                  <EditSVG />
                </div>
                <span class="text-primary-500 font-normal text-base">Editar</span>
              </NuxtLink>
            </li>
            <li
              data-testId="delete-option"
              @click="handleDelete"
              class="p-3 flex cursor-pointer items-center border-t border-primary-50 gap-2"
            >
              <div class="size-6 flex items-center justify-center">
                <ThinTrashSVG class="size-6 fill-none text-primary-500" />
              </div>
              <span class="text-primary-500 font-normal text-base">Deletar</span>
            </li>
          </ul>
        </button>
      </div>
    </div>

    <div
      class="flex w-full max-w-full h-fit px-2 sm:px-4 py-5 gap-4 bg-white rounded-b-2xl border border-neutral-200 flex-col"
    >
      <div class="font-bold text-primary-900 line-clamp-1 text-base md:text-xl">
        {{ project.name }}
      </div>

      <div class="flex items-center gap-1">
        <span class="font-bold text-sm md:text-base text-neutral-500">Cliente:</span>
        <div class="text-neutral-500 line-clamp-1 font-normal text-sm md:text-base">
          {{ project.client }}
        </div>
      </div>

      <hr class="w-full text-neutral-50 h-px" />

      <div class="flex items-center gap-3">
        <div class="max-sm:hidden">
          <StartCalendarSVG />
        </div>
        <p class="text-neutral-500 font-normal text-xs sm:text-base">
          {{ formatDateToLong(project.startDate) }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="max-sm:hidden">
          <EndCalendarSVG />
        </div>
        <p class="text-neutral-500 font-normal text-xs sm:text-base">
          {{ formatDateToLong(project.endDate) }}
        </p>
      </div>
    </div>
  </div>
</template>
