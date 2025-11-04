import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Switch from './index.vue';

describe('Switch', () => {
  it('should render the label when provided', () => {
    const wrapper = mount(Switch, {
      props: {
        label: 'Ativar notificações',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Ativar notificações');
  });

  it('should not render the label if not provided', () => {
    const wrapper = mount(Switch);
    expect(wrapper.find('label').exists()).toBe(false);
  });

  it('should toggle the model value on click', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    });

    expect(wrapper.props('modelValue')).toBe(false);

    await wrapper.find('.flex.cursor-pointer').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

    await wrapper.setProps({ modelValue: true });
    await wrapper.find('.flex.cursor-pointer').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false]);
  });

  it('should apply correct classes for the "off" state', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false },
    });

    const container = wrapper.find('.rounded-xl');
    const toggle = wrapper.find('.rounded-full');

    expect(container.classes()).toContain('bg-neutral-500');
    expect(toggle.classes()).toContain('translate-x-0');
  });

  it('should apply correct classes for the "on" state', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true },
    });

    const container = wrapper.find('.rounded-xl');
    const toggle = wrapper.find('.rounded-full');

    expect(container.classes()).toContain('bg-accent');
    expect(toggle.classes()).toContain('translate-x-6');
  });
});
