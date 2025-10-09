import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateHeader from './index.vue';

describe('CreateHeader', () => {
  it('should render the title correctly', async () => {
    const wrapper = await mount(CreateHeader);

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Novo projeto');
  });

  it('should render the back button with icon and text', async () => {
    const wrapper = await mount(CreateHeader);

    const button = wrapper.find('button');
    expect(button.text()).toContain('Voltar');
    expect(wrapper.findComponent({ name: 'IconArrowLeft' }).exists()).toBe(true);
  });

  it('should call window.history.back() when clicking the back button', async () => {
    const backSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});

    const wrapper = await mount(CreateHeader);
    await wrapper.find('button').trigger('click');

    expect(backSpy).toHaveBeenCalledTimes(1);
    backSpy.mockRestore();
  });
});
