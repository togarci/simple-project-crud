import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from './index.vue';

const ButtonStub = {
  name: 'Button',
  template: '<button @click="$emit(\'click\', $event)"><slot /></button>',
  emits: ['click'],
};

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should not be visible when isOpenModal is false', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        isOpenModal: false,
      },
    });
    expect(wrapper.find('[data-testId="simple-modal"]').exists()).toBe(false);
  });

  it('should be visible and render title and slots when isOpenModal is true', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'My Modal Title',
        isOpenModal: true,
      },
      slots: {
        default: '<p>Modal Content</p>',
        icon: '<svg data-testid="icon-slot"></svg>',
      },
      global: {
        stubs: { Button: ButtonStub },
      },
    });

    expect(wrapper.find('[data-testId="simple-modal"]').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('My Modal Title');
    expect(wrapper.find('p').text()).toBe('Modal Content');
    expect(wrapper.find('[data-testid="icon-slot"]').exists()).toBe(true);
  });

  it('should not render the icon container if the icon slot is not provided', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'No Icon Modal',
        isOpenModal: true,
      },
      slots: {
        default: '<p>Modal Content</p>',
      },
    });

    expect(wrapper.find('[data-testId="content-icon"]').find('div > div').exists()).toBe(false);
  });

  it('should emit an update event to close the modal when clicking "Cancelar"', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        isOpenModal: true,
      },
      global: {
        stubs: { Button: ButtonStub },
      },
    });

    const cancelButton = wrapper.findAllComponents(ButtonStub).find((btn) => btn.text() === 'Cancelar');
    await cancelButton!.trigger('click');

    expect(wrapper.emitted('update:isOpenModal')).toBeTruthy();
    expect(wrapper.emitted('update:isOpenModal')![0]).toEqual([false]);
  });

  it('should emit a Submit event when clicking "Confirmar"', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        isOpenModal: true,
      },
      global: {
        stubs: { Button: ButtonStub },
      },
    });

    const confirmButton = wrapper.findAllComponents(ButtonStub).find((btn) => btn.text() === 'Confirmar');
    await confirmButton!.trigger('click');

    expect(wrapper.emitted('Submit')).toBeTruthy();
  });

  it('should close the modal when clicking the backdrop', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        isOpenModal: true,
      },
    });

    await wrapper.find('[data-testId="simple-modal"]').trigger('click');

    expect(wrapper.emitted('update:isOpenModal')).toBeTruthy();
    expect(wrapper.emitted('update:isOpenModal')![0]).toEqual([false]);
  });

  it('should not close the modal when clicking inside its content', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        isOpenModal: true,
      },
    });

    await wrapper.find('[class*="overflow-y-auto"]').trigger('click');

    expect(wrapper.emitted('update:isOpenModal')).toBeUndefined();
  });

  it('should close the modal when the Escape key is pressed', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        isOpenModal: true,
      },
      attachTo: document.body,
    });

    await window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(wrapper.emitted('update:isOpenModal')).toBeTruthy();
    expect(wrapper.emitted('update:isOpenModal')![0]).toEqual([false]);

    wrapper.unmount();
  });
});
