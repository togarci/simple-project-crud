<script lang="ts" setup>
import { debounce } from 'perfect-debounce';
import { useHistoryStore } from '~/store/history';

const historyStore = useHistoryStore();
const model = defineModel<string>('searchQ');

const isOpenSearchHistory = ref(false);

const handleRemoveHistory = (historyIndex: number) => {
  historyStore.removeFromData(historyIndex);
};

const debouncedAddToHistory = debounce((query: string) => {
  if (query && !historyStore.history.includes(query)) {
    historyStore.addToData(query);
  }
}, 800);

watch(model, (newValue) => {
  if (newValue) {
    debouncedAddToHistory(newValue);
  }
});

const handleBlur = () => {
  setTimeout(() => (isOpenSearchHistory.value = false), 150);
};
</script>

<template>
  <header class="w-full h-[78px] shadow-custom-100 bg-white px-px">
    <div
      class="flex items-center px-10 relative size-full rounded-t-2xl gap-5"
      :class="{ 'border-2 border-primary-500 !border-b-0': isOpenSearchHistory && historyStore.history.length > 0 }"
    >
      <IconSearch className="fill-none text-primary-500 size-5" />
      <input
        v-model="model"
        type="text"
        class="flex-1 text-primary-950 text-lg font-normal"
        placeholder="Buscar projeto"
        @focus="isOpenSearchHistory = true"
        @blur="handleBlur"
      />

      <ul
        v-if="isOpenSearchHistory && historyStore.history.length > 0"
        class="bg-white absolute top-[75px] -left-0.5 z-10 rounded-b-2xl border-2 border-primary-500 w-[calc(100%+4px)] !border-t-0"
      >
        <li
          v-for="(history, i) in historyStore.history"
          :key="`${i}-history`"
          class="flex border-t justify-between border-primary-50 w-full py-4 items-center"
        >
          <div
            @click="model = history"
            class="flex px-10 flex-1 items-center gap-4 cursor-pointer"
            :data-testid="`history-item-${i}`"
          >
            <IconHistory />
            <p class="font-normal text-base text-neutral-500">{{ history }}</p>
          </div>

          <button
            class="z-20 cursor-pointer px-10"
            @click="handleRemoveHistory(i)"
            type="button"
            :data-testid="`remove-history-${i}`"
          >
            <IconClose />
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>
