import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import EmptyState from './index.vue';

describe('Home/EmptyState', () => {
  it('should render the heading and paragraph correctly', async () => {
    const wrapper = await mountSuspended(EmptyState);

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Nenhum Projeto');

    const paragraph = wrapper.find('p');
    expect(paragraph.exists()).toBe(true);
    expect(paragraph.text()).toBe('Clique no botão abaixo para criar o primeiro e gerenciá-lo.');
  });

  it('should render a link to create a new project with a button inside', async () => {
    const wrapper = await mountSuspended(EmptyState);

    const link = wrapper.findComponent({ name: 'NuxtLink' });
    expect(link.exists()).toBe(true);
    expect(link.props('to')).toBe('/new-project');

    const button = link.findComponent({ name: 'Button' });
    expect(button.exists()).toBe(true);

    const icon = button.findComponent({ name: 'IconCirclePlus' });
    expect(icon.exists()).toBe(true);

    expect(button.text()).toContain('Novo Projeto');
  });
});
