<script lang="ts" setup>
defineProps<{
  label?: string;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <div @click="model = !model" class="flex cursor-pointer items-center gap-2">
    <div class="rounded-xl p-1.5 w-12 flex items-center" :class="{ 'bg-neutral-500': !model, 'bg-accent': model }">
      <div
        class="bg-white rounded-full size-3 ease-linear duration-100 transition-transform"
        :class="{ 'translate-x-0': !model, 'translate-x-6': model }"
      />
    </div>
    <label v-if="label" class="font-normal text-base text-primary-950">{{ label }}</label>
  </div>
</template>
