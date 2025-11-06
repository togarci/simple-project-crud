import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Header from './index.vue';

describe('Layout/Header', () => {
  it('should render the logo and title correctly', async () => {
    const wrapper = await mountSuspended(Header);

    const logo = wrapper.find('[data-testId="header-img-logo"]');
    expect(logo.exists()).toBe(true);

    const title = wrapper.find('h1');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Gerenciador de Projetos');
  });

  it('should contain a link to the homepage', async () => {
    const wrapper = await mountSuspended(Header);

    const link = wrapper.findComponent({ name: 'NuxtLink' });
    expect(link.exists()).toBe(true);
    expect(link.props('href')).toBe('/');
  });

  it('should render the search button with its icon', async () => {
    const wrapper = await mountSuspended(Header);

    const searchIcon = wrapper.findComponent({ name: 'SearchSVG' });
    expect(searchIcon.exists()).toBe(true);
  });
});
