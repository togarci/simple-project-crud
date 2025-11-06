import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectHeader from './index.vue';

const mockRouter = {
  push: vi.fn(),
};

describe('PageHeader', () => {
  it('should render the title correctly', async () => {
    const wrapper = await mount(ProjectHeader, {
      props: {
        title: 'Novo projeto',
      },
    });

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Novo projeto');
  });

  it('should render the back button with icon and text', async () => {
    const wrapper = await mount(ProjectHeader);

    const button = wrapper.find('button');
    expect(button.text()).toContain('Voltar');
    expect(wrapper.findComponent({ name: 'ArrowLeftSVG' }).exists()).toBe(true);
  });
});
