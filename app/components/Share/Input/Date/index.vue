<script lang="ts" setup>
const { label, name } = defineProps<{
  label?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}>();

const model = defineModel<Date | string | any>();

const dateInput = ref<HTMLInputElement | null>(null);

const handleContainerClick = () => {
  dateInput.value?.showPicker();
};
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div class="w-full flex-col gap-2 flex outline-none" data-testId="container-input">
      <label
        data-testId="label-test"
        v-if="label"
        class="font-medium text-lg"
        :class="{ 'text-error-700': error, 'text-primary-500': !error }"
        :for="`input-id-${name.replaceAll(' ', '-')}`"
      >
        {{ label }}
        <span
          v-if="required"
          data-testId="required-label"
          :class="{ 'text-error-500': error, 'text-neutral-500': !error }"
          class="font-normal ml-1 text-sm"
        >
          (Obrigatório)
        </span>
      </label>
      <div
        @click="handleContainerClick"
        class="w-full flex justify-between h-10 items-center px-2.5 py-1 rounded-sm border bg-white cursor-pointer"
        :class="{
          'border-error-500': error,
          'justify-end': !model,
          'border-neutral-500': !error,
          'cursor-not-allowed': disabled,
        }"
      >
        <span date-testId="date-value" v-if="model" class="font-normal text-base text-primary-900">
          {{
            new Date(new Date(model).getTime() + new Date(model).getTimezoneOffset() * 60000).toLocaleDateString(
              'pt-BR'
            )
          }}</span
        >

        <div class="relative">
          <slot></slot>
          <input
            class="size-0 absolute top-0 right-0 -z-10 overflow-hidden"
            ref="dateInput"
            :id="`date-input-id-${name.replaceAll(' ', '-')}`"
            type="date"
            :name="name"
            v-model="model"
            :disabled="disabled"
            data-testId="date-input-test"
          />
        </div>
      </div>
    </div>

    <span data-testId="error-message" v-if="error" class="font-normal text-sm text-error-500">{{ error }}</span>
  </div>
</template>
