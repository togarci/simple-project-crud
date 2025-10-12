import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useHistoryStore } from '../history';

describe('useHistoryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have an empty history on initial state', () => {
    const store = useHistoryStore();
    expect(store.history).toEqual([]);
  });

  it('should add a search query to the history using addToData', () => {
    const store = useHistoryStore();
    const searchQuery = 'test query';

    store.addToData(searchQuery);

    expect(store.history).toHaveLength(1);
    expect(store.history).toContain(searchQuery);
  });

  it('should add multiple search queries', () => {
    const store = useHistoryStore();
    store.addToData('query 1');
    store.addToData('query 2');

    expect(store.history).toHaveLength(2);
    expect(store.history).toEqual(['query 1', 'query 2']);
  });

  it('should remove a search query from the history using removeFromData', () => {
    const store = useHistoryStore();
    const queryToKeep = 'query to keep';
    const queryToRemove = 'query to remove';

    store.history = [queryToKeep, queryToRemove];

    store.removeFromData(1);

    expect(store.history).toHaveLength(1);
    expect(store.history).not.toContain(queryToRemove);
    expect(store.history).toContain(queryToKeep);
  });

  it('should not modify the history if trying to remove a non-existent index', () => {
    const store = useHistoryStore();
    store.history = ['query 1', 'query 2'];
    store.removeFromData(5);
    expect(store.history).toEqual(['query 1', 'query 2']);
  });
});
