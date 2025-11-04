import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Select from './index.vue';

const mockOptions = [
  { text: 'Ordem alfabética', value: 'alphabetical' },
  { text: 'Iniciados mais recentes', value: 'recent' },
  { text: 'Prazo mais próximo', value: 'deadline' },
];

describe('Select', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render with the initial value selected', () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
        modelValue: 'recent',
      },
    });

    expect(wrapper.find('[data-testId="select-test"]').text()).toContain('Iniciados mais recentes');
  });

  it('should default to the first option if no modelValue is provided on mount', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['alphabetical']);
  });

  it('should toggle the options list on button click', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
      },
    });

    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(false);

    await wrapper.find('[data-testId="select-test"]').trigger('click');
    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(true);

    await wrapper.find('[data-testId="select-test"]').trigger('click');
    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(false);
  });

  it('should update the modelValue when an option is clicked', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
        modelValue: 'alphabetical',
      },
    });

    await wrapper.find('[data-testId="select-test"]').trigger('click');

    const options = wrapper.findAll('li');
    await options[1]?.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['recent']);
  });

  it('should close the list when clicking outside', async () => {
    const wrapper = mount(Select, {
      props: { options: mockOptions },
      attachTo: document.body,
    });

    await wrapper.find('[data-testId="select-test"]').trigger('click');
    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(true);

    await document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(false);
    wrapper.unmount();
  });

  it('should close the list when pressing Escape key', async () => {
    const wrapper = mount(Select, { props: { options: mockOptions }, attachTo: document.body });

    await wrapper.find('[data-testId="select-test"]').trigger('click');
    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(true);

    await wrapper.trigger('keydown', { key: 'Escape' });
    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(false);
  });

  it('should be disabled and not open the list', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
        disabled: true,
      },
    });

    expect(wrapper.find('[data-testId="select-test"]').classes()).toContain('cursor-not-allowed');

    await wrapper.find('[data-testId="select-test"]').trigger('click');
    expect(wrapper.find('[data-testId="select-options"]').exists()).toBe(false);
  });
});
