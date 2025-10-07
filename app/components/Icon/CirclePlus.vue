<script lang="ts" setup>
const { className = 'size-6 fill-none text-white' } = defineProps<{
  className?: string;
}>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="className" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10M12 8v8M8 12h8"
    ></path>
  </svg>
</template>
