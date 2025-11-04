<script setup lang="ts">
const {
  type = 'button',
  variant = 'primary',
  size = 'md',
} = defineProps<{
  disabled?: boolean;
  type?: HTMLButtonElement['type'];
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
}>();

defineEmits(['click']);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
    class="rounded-[26px] w-full flex items-center justify-center font-normal px-8 transition-colors"
    :class="{
      'bg-primary-200 cursor-not-allowed text-white': disabled,
      'bg-primary-500 hover:bg-primary-600 cursor-pointer text-white': variant === 'primary' && !disabled,
      'bg-white border border-primary-500 hover:bg-secondary-500 text-primary-500  cursor-pointer':
        variant === 'secondary' && !disabled,
      'md:h-10 h-9 text-sm md:text-base gap-2.5': size === 'md',
      'h-10 md:h-[52px] text-lg md:text-xl gap-3.5': size === 'lg',
    }"
  >
    <slot></slot>
  </button>
</template>
