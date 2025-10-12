<script setup lang="ts">
const { className = 'size-5 fill-none text-white' } = defineProps<{
  className?: any;
}>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="className" viewBox="0 0 20 20">
    <path
      d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19 19L14.65 14.65"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
