<script lang="ts" setup>
import { toast } from 'vue3-toastify';

const emits = defineEmits(['update:modelValue']);

const props = defineProps<{
  limitMbSize: number;
  modelValue: string | null;
}>();

const refInput = ref<HTMLInputElement | null>(null);

const handleClick = () => {
  if (refInput.value) {
    refInput.value.value = '';
  }

  refInput.value?.click();
};

const handleChange = (evt: Event) => {
  const inputValue = evt.target as HTMLInputElement;
  const file = inputValue.files?.[0];

  if (file?.size && file?.size > props.limitMbSize * 1024 * 1024) {
    toast.error('Tamanho excedido! A imagem deve ter no máximo 1 MB.', {
      position: toast.POSITION.TOP_CENTER,
    });

    return;
  }

  emits('update:modelValue', file ? URL.createObjectURL(file) : '');
};

const handleRemoveImage = () => {
  emits('update:modelValue', '');
};
</script>

<template>
  <div class="relative">
    <button
      v-if="modelValue"
      class="absolute top-2 right-2 p-1 border border-gray-600 rounded-full bg-white flex justify-center items-center"
      @click="handleRemoveImage"
    >
      <IconTrash />
    </button>
    <div
      @click="handleClick"
      class="flex flex-col rounded-md cursor-pointer justify-center items-center w-full overflow-hidden border border-dashed border-neutral-500 max-lg:flex-col"
      :class="{ 'py-5 px-10 gap-3': !modelValue }"
    >
      <input ref="refInput" type="file" class="h-0 hidden" @change="handleChange" accept="image/png, image/jpg" />

      <template v-if="!modelValue">
        <IconUpload />

        <div class="flex flex-col gap-3">
          <p class="text-neutral-500 text-center font-normal text-sm lg:text-base">
            Escolha uma imagem .jpg ou .png no seu dispositivo
          </p>
        </div>

        <div>
          <Button variant="secondary"> <p class="text-base">Selecionar</p></Button>
        </div>
      </template>

      <template v-else>
        <img class="size-full object-contain" :src="modelValue" alt="non alt" />
      </template>
    </div>
  </div>
</template>
