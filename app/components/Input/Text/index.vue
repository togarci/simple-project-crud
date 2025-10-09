<script lang="ts" setup>
const model = defineModel<any>();

defineProps<{
  label?: string;
  name: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="w-full flex-col gap-2 cursor-pointer flex outline-none" data-testId="container-input">
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
        class="w-full px-2.5 py-1 flex h-10 items-center rounded-lg border bg-white"
        :class="{ 'border-error-500': error, 'border-neutral-500': !error, 'cursor-not-allowed': disabled }"
      >
        <input
          :id="`input-id-${name.replaceAll(' ', '-')}`"
          class="w-full flex-1 outline-none font-normal text-base placeholder:text-base text-primary-900"
          :class="{ 'text-error-500': error, 'text-primary-900': !error }"
          type="text"
          :name="name"
          v-model="model"
          :placeholder="placeholder"
          :disabled="disabled"
          data-testId="input"
        />
      </div>
    </div>

    <span data-testId="error-message" v-if="error" class="font-normal text-sm text-error-500">{{ error }}</span>
  </div>
</template>
