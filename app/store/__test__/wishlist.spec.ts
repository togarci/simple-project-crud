import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWishListeStore } from '../wishlist';

describe('useWishListeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have an empty wishlist on initial state', () => {
    const store = useWishListeStore();
    expect(store.wishlist).toEqual([]);
  });

  it('should add a project id to the wishlist using addToData', () => {
    const store = useWishListeStore();
    const projectId = 'project-123';

    store.addToData(projectId);

    expect(store.wishlist).toHaveLength(1);
    expect(store.wishlist).toContain(projectId);
  });

  it('should remove a project id from the wishlist using removeFromData', () => {
    const store = useWishListeStore();
    const projectIdToRemove = 'project-abc';
    const projectIdToKeep = 'project-def';

    store.wishlist = [projectIdToRemove, projectIdToKeep];

    store.removeFromData(projectIdToRemove);

    expect(store.wishlist).toHaveLength(1);
    expect(store.wishlist).not.toContain(projectIdToRemove);
    expect(store.wishlist).toContain(projectIdToKeep);
  });

  it('should not modify the wishlist if trying to remove a non-existent project id', () => {
    const store = useWishListeStore();
    store.wishlist = ['project-1', 'project-2'];
    store.removeFromData('project-non-existent');
    expect(store.wishlist).toEqual(['project-1', 'project-2']);
  });
});
