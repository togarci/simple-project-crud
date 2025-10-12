import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import ProjectCard from './index.vue';

const mockProject = {
  id: '123-abc',
  name: 'Meu Projeto de Teste',
  client: 'Cliente Fictício',
  startDate: '2024-07-25',
  endDate: '2024-12-30',
  image: 'https://example.com/image.png',
};

describe('ProjectCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render project information correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
      },
    });

    expect(wrapper.text()).toContain('Meu Projeto de Teste');
    expect(wrapper.text()).toContain('Cliente Fictício');

    expect(wrapper.text()).toContain('25 de julho de 2024');
    expect(wrapper.text()).toContain('30 de dezembro de 2024');
    expect(wrapper.find('img').attributes('src')).toBe(mockProject.image);
  });

  it('should use a fallback image if no image is provided', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: { ...mockProject, image: null },
      },
    });

    expect(wrapper.find('img').attributes('src')).toBe('/image/ProjectCard/Image.png');
  });

  it('should toggle the actions menu on button click', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
      },
    });

    expect(wrapper.find('ul').exists()).toBe(false);

    await wrapper.find('[data-testId="button-menu"]').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);

    await wrapper.find('[data-testId="button-menu"]').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('should emit handleDelete event when "Deletar" is clicked', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
      },
    });

    await wrapper.find('[data-testId="button-menu"]').trigger('click');

    const optionDelete = await wrapper.find('[data-testId="delete-option"]');
    expect(optionDelete.exists()).toBe(true);

    await optionDelete.trigger('click');
    await wrapper.vm.$nextTick();

    // @ts-ignore
    const isOpenModal = wrapper.vm.isOpenModal;
    expect(isOpenModal).toEqual(true);
  });

  it('should close the menu when clicking outside', async () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
      attachTo: document.body,
    });

    await wrapper.find('[data-testId="button-menu"]').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);

    await document.body.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('ul').exists()).toBe(false);

    wrapper.unmount();
  });
});
