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
const menuRef: any = ref(null);
const isFavorite = computed(() => wishListStore.wishlist.includes(props.project.id));

const deleteProject = (projectId: string) => {
  try {
    projectStore.removeFromData(projectId);
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
  <div>
    <div class="relative">
      <img
        :src="project.image ? project.image : '/image/ProjectCard/Image.png'"
        class="w-[346px] h-[232px] object-cover rounded-t-2xl"
      />

      <div class="flex items-center absolute bottom-5 right-5 gap-5">
        <button @click="handleWishList" type="button">
          <IconStar
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
          <IconMenu />

          <ul v-if="isOpenMenu" class="absolute shadow-custom-100 rounded-lg bg-white w-[240px] right-0 top-9">
            <li data-testId="edit-option">
              <NuxtLink class="p-3 cursor-pointer flex items-center gap-2" :to="`/project/${project.id}`">
                <div class="size-6 flex items-center justify-center">
                  <IconEdit />
                </div>
                <span class="text-primary-500 font-normal text-base">Editar</span>
              </NuxtLink>
            </li>
            <li
              data-testId="delete-option"
              @click="deleteProject(project.id)"
              class="p-3 flex cursor-pointer items-center border-t border-primary-50 gap-2"
            >
              <div class="size-6 flex items-center justify-center">
                <IconThinTrash class="size-6 fill-none text-primary-500" />
              </div>
              <span class="text-primary-500 font-normal text-base">Deletar</span>
            </li>
          </ul>
        </button>
      </div>
    </div>

    <div class="flex w-full px-4 py-5 gap-4 bg-white rounded-b-2xl border border-neutral-200 flex-col">
      <p class="font-bold text-primary-900 text-xl">{{ project.name }}</p>
      <div class="flex items-center gap-1">
        <span class="font-bold text-base text-neutral-500">Cliente:</span>
        <p class="text-neutral-500 font-normal text-base">
          {{ project.client }}
        </p>
      </div>

      <hr class="w-full text-neutral-50 h-px" />

      <div class="flex items-center gap-3">
        <IconStartCalendar />
        <p class="text-neutral-500 font-normal text-base">
          {{ formatDateToLong(project.startDate) }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <IconEndCalendar />
        <p class="text-neutral-500 font-normal text-base">
          {{ formatDateToLong(project.endDate) }}
        </p>
      </div>
    </div>
  </div>
</template>
