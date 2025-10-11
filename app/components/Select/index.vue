<script lang="ts" setup>
const { disabled, options } = defineProps<{
  disabled?: boolean;
  options: {
    text: string;
    value: any;
  }[];
}>();

const model = defineModel();

const selectRef: any = ref(null);
const isOpenSelect = ref(false);

const handleClick = (evt: any) => {
  const eventTarget = evt.target;
  if (selectRef.value && !selectRef.value.contains(eventTarget)) isOpenSelect.value = false;
};

const handleEsc = (evt: KeyboardEvent) => {
  if (evt.key === 'Escape') isOpenSelect.value = false;
};

const handleOpenSelect = () => {
  if (!disabled) isOpenSelect.value = !isOpenSelect.value;
};

onMounted(() => {
  if (!model.value) model.value = options?.[0]?.value;

  window.addEventListener('click', handleClick);
  window.addEventListener('keydown', handleEsc);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClick);
  window.removeEventListener('keydown', handleEsc);
});
</script>

<template>
  <div class="relative w-full">
    <button
      @click="handleOpenSelect"
      type="button"
      ref="selectRef"
      class="w-full h-10 outline-none min-w-[296px] border cursor-pointer bg-white px-4 flex items-center justify-between"
      :class="{
        'rounded-lg border-neutral-500': !isOpenSelect,
        'rounded-t-lg border-primary-500': isOpenSelect,
        'cursor-not-allowed bg-neutral-200': disabled,
      }"
    >
      <p class="font-normal text-base" v-if="model">
        {{ options.find((option) => option.value === model)?.text }}
      </p>

      <div
        class="transition-transform ease-linear duration-100"
        :class="{ 'rotate-180': isOpenSelect, 'rotate-0': !isOpenSelect }"
      >
        <IconAngleBottom />
      </div>
    </button>

    <ul
      v-if="isOpenSelect"
      class="absolute w-full z-10 bg-white right-0 flex rounded-b-lg shadow-custom-100 border border-primary-500 !border-t-0 flex-col"
    >
      <li
        v-for="option in options"
        @click="model = option.value"
        class="p-4 cursor-pointer font-normal text-nowrap hover:text-primary text-base border-b border-primary-50 last:border-0"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>
