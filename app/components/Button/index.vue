<script setup lang="ts">
const { type = 'button' } = defineProps<{
  disabled?: boolean;
  type?: HTMLButtonElement['type'];
}>();

defineEmits(['click']);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
    class="rounded-[26px] w-full flex items-center justify-center gap-3.5 font-normal text-white text-xl py-3 px-5 transition-colors"
    :class="{
      'bg-neutral-400 cursor-not-allowed': disabled,
      'bg-primary-500 hover:bg-primary-600 cursor-pointer': !disabled,
    }"
  >
    <slot></slot>
  </button>
</template>
