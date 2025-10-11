import { describe, it, expect } from 'vitest';

import Button from './index.vue';
import { mount } from '@vue/test-utils';

describe('Button', () => {
  it('should render the slot content', async () => {
    const wrapper = await mount(Button, {
      slots: {
        default: 'Test Button Slot',
      },
    });

    expect(wrapper.text()).toContain('Test Button Slot');
  });

  it('should have default attributes', async () => {
    const wrapper = await mount(Button);

    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.attributes('disabled')).toBeUndefined();
    expect(wrapper.classes()).toContain('bg-primary-500');
    expect(wrapper.classes()).toContain('cursor-pointer');
  });

  it('should be disabled when the disabled prop is true', async () => {
    const wrapper = await mount(Button, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('bg-primary-200');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('should emit a click event when clicked', async () => {
    const wrapper = await mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should not emit a click event when disabled and clicked', async () => {
    const wrapper = await mount(Button, {
      props: {
        disabled: true,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('should render correctly size', async () => {
    const wrapper = await mount(Button, {
      props: {
        size: 'md',
      },
    });

    expect(wrapper.classes()).toContain('h-10 text-base gap-2.5');

    await wrapper.setProps({ size: 'lg' });
    expect(wrapper.classes()).toContain('h-[52px] text-xl gap-3.5');
  });
});
