import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useHistoryStore } from '~/store/history';
import InputSearch from './index.vue';

vi.mock('perfect-debounce', () => ({
  debounce: (fn: Function) => fn,
}));

describe('InputSearch', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should not display search history on initial render', () => {
    const wrapper = mount(InputSearch);
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('should display search history on focus if history is not empty', async () => {
    const historyStore = useHistoryStore();
    historyStore.history = ['test query'];

    const wrapper = mount(InputSearch);

    await wrapper.find('input').trigger('focus');

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.text()).toContain('test query');
  });

  it('should not display search history on focus if history is empty', async () => {
    const wrapper = mount(InputSearch);

    await wrapper.find('input').trigger('focus');

    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('should hide search history on blur', async () => {
    vi.useFakeTimers();
    const historyStore = useHistoryStore();
    historyStore.history = ['test query'];

    const wrapper = mount(InputSearch);

    await wrapper.find('input').trigger('focus');
    expect(wrapper.find('ul').exists()).toBe(true);

    await wrapper.find('input').trigger('blur');

    vi.advanceTimersByTime(150);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('ul').exists()).toBe(false);
    vi.useRealTimers();
  });

  it('should add a new query to the history', async () => {
    const historyStore = useHistoryStore();
    const addToDataSpy = vi.spyOn(historyStore, 'addToData');

    const wrapper = mount(InputSearch);

    const input = wrapper.find('input');
    await input.setValue('new search');

    expect(addToDataSpy).toHaveBeenCalledWith('new search');
  });

  it('should not add a duplicate query to the history', async () => {
    const historyStore = useHistoryStore();
    historyStore.history = ['existing query'];
    const addToDataSpy = vi.spyOn(historyStore, 'addToData');

    const wrapper = mount(InputSearch);

    const input = wrapper.find('input');
    await input.setValue('existing query');

    expect(addToDataSpy).not.toHaveBeenCalled();
  });

  it('should not add an empty query to the history', async () => {
    const historyStore = useHistoryStore();
    const addToDataSpy = vi.spyOn(historyStore, 'addToData');

    const wrapper = mount(InputSearch);

    const input = wrapper.find('input');
    await input.setValue('');

    expect(addToDataSpy).not.toHaveBeenCalled();
  });

  it('should update the model when a history item is clicked', async () => {
    const historyStore = useHistoryStore();
    historyStore.history = ['clicked query'];

    const wrapper = mount(InputSearch, {
      props: {
        'onUpdate:searchQ': (e) => wrapper.setProps({ searchQ: e }),
      },
    });

    await wrapper.find('input').trigger('focus');

    const historyItem = wrapper.find('[data-testid="history-item-0"]');
    await historyItem.trigger('click');

    expect(wrapper.props('searchQ')).toBe('clicked query');
    expect(wrapper.find('input').element.value).toBe('clicked query');
  });

  it('should remove a history item when the remove button is clicked', async () => {
    const historyStore = useHistoryStore();
    historyStore.history = ['query to remove'];
    const removeFromDataSpy = vi.spyOn(historyStore, 'removeFromData');

    const wrapper = mount(InputSearch);

    await wrapper.find('input').trigger('focus');

    const removeButton = wrapper.find('[data-testid="remove-history-0"]');
    await removeButton.trigger('click');

    expect(removeFromDataSpy).toHaveBeenCalledWith(0);
  });

  it('should apply border styles when search history is open', async () => {
    const historyStore = useHistoryStore();
    historyStore.history = ['test query'];

    const wrapper = mount(InputSearch);

    const headerDiv = wrapper.find('.flex.items-center');
    expect(headerDiv.classes()).not.toContain('border-2');

    await wrapper.find('input').trigger('focus');

    expect(headerDiv.classes()).toContain('border-2');
    expect(headerDiv.classes()).toContain('border-primary-500');
  });
});
