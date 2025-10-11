export const useWishListeStore = defineStore(
  'wishlist',
  () => {
    const wishlist = ref<string[]>([]);

    function addToData(projetId: string) {
      wishlist.value.push(projetId);
    }

    function removeFromData(projetId: string) {
      wishlist.value = wishlist.value.filter((item) => item !== projetId);
    }

    return { wishlist, addToData, removeFromData };
  },
  { persist: true }
);
