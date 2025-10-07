<script setup lang="ts">
const { className = 'size-5 fill-none text-white' } = defineProps<{
  className?: string;
}>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="className" viewBox="0 0 20 20">
    <path fill="#1E1E1E" d="M0 0h20v20H0z"></path>
    <path fill="#F4F2FF" d="M-1857-30H83v1080h-1940z"></path>
    <g filter="url(#filter0_d_0_1)">
      <g filter="url(#filter1_d_0_1)">
        <path fill="#1C1930" d="M-1857-30H83v80h-1940z"></path>
        <path stroke="#000" d="M-1856.5-29.5h1939v79h-1939z"></path>
      </g>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16M19 19l-4.35-4.35"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_d_0_1"
        width="1948"
        height="88"
        x="-1861"
        y="-30"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_1"></feBlend>
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"></feBlend>
      </filter>
      <filter
        id="filter1_d_0_1"
        width="1948"
        height="88"
        x="-1861"
        y="-30"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_1"></feBlend>
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"></feBlend>
      </filter>
    </defs>
  </svg>
</template>
