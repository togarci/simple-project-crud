import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Button from './index.vue';

describe('Button', () => {
  it('should render the slot content', async () => {
    const wrapper = await mountSuspended(Button, {
      slots: {
        default: 'Test Button Slot',
      },
    });

    expect(wrapper.text()).toContain('Test Button Slot');
  });

  it('should have default attributes', async () => {
    const wrapper = await mountSuspended(Button);

    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.attributes('disabled')).toBeUndefined();
    expect(wrapper.classes()).toContain('bg-primary-500');
    expect(wrapper.classes()).toContain('cursor-pointer');
  });

  it('should be disabled when the disabled prop is true', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('bg-neutral-400');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('should emit a click event when clicked', async () => {
    const wrapper = await mountSuspended(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should not emit a click event when disabled and clicked', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        disabled: true,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
