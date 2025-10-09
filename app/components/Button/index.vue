<script setup lang="ts">
const { type = 'button', variant = 'primary' } = defineProps<{
  disabled?: boolean;
  type?: HTMLButtonElement['type'];
  variant?: 'primary' | 'secondary';
}>();

defineEmits(['click']);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
    class="rounded-[26px] w-full flex items-center justify-center gap-3.5 font-normal text-xl px-8 transition-colors"
    :class="{
      'bg-primary-200 cursor-not-allowed text-white py-3': disabled,
      'bg-primary-500 hover:bg-primary-600 cursor-pointer text-white py-3': variant === 'primary' && !disabled,
      'bg-white border border-primary-500 hover:bg-secondary-500 text-primary-500 py-[11px] cursor-pointer':
        variant === 'secondary' && !disabled,
    }"
  >
    <slot></slot>
  </button>
</template>
