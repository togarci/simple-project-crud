import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Header from './index.vue';
import Switch from '~/components/Share/Switch/index.vue';
import Select from '~/components/Share/Select/index.vue';

const ButtonStub = {
  name: 'Button',
  template: '<button><slot /></button>',
};

const NuxtLinkStub = {
  name: 'NuxtLink',
  template: '<a><slot /></a>',
  props: ['to'],
};

const IconCirclePlusStub = {
  name: 'IconCirclePlus',
  template: '<svg></svg>',
};

describe('Home/Header', () => {
  const stubs = {
    Switch: Switch,
    Button: ButtonStub,
    NuxtLink: NuxtLinkStub,
    IconCirclePlus: IconCirclePlusStub,
  };

  it('should render the project count correctly', () => {
    const wrapper = mount(Header, {
      props: {
        projectCount: 10,
      },
      global: {
        stubs,
      },
    });

    const heading = wrapper.find('h1');
    expect(heading.text()).toBe('Projetos (10)');
  });

  it('should update the wishList v-model when the Switch is changed', async () => {
    const wrapper = mount(Header, {
      props: {
        projectCount: 0,
        wishList: false,
        'onUpdate:wishList': (value: boolean | undefined) => {
          wrapper.setProps({ wishList: value });
        },
      },
      global: { stubs },
    });

    await wrapper.findComponent(Switch).trigger('click');
    expect(wrapper.props('wishList')).toBe(true);
  });

  it('should have a NuxtLink pointing to the project creation page', () => {
    const wrapper = mount(Header, {
      props: { projectCount: 0 },
      global: { stubs: { NuxtLink: true, IconCirclePlus: true, Button: true } },
    });
    const link = wrapper.findComponent({ name: 'NuxtLink' });
    expect(link.props('to')).toBe('/project/create');
  });
});
