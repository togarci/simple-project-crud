export const useHistoryStore = defineStore(
  'history',
  () => {
    const history = ref<string[]>([]);

    function addToData(searchQ: string) {
      if (history.value.length >= 5) history.value.pop();

      if (!history.value.includes(searchQ)) history.value.unshift(searchQ);
      else history.value.splice(history.value.indexOf(searchQ), 1);
    }

    function removeFromData(indexHistory: number) {
      history.value = history.value.filter((_, index) => index !== indexHistory);
    }

    return { history, addToData, removeFromData };
  },
  { persist: true }
);
