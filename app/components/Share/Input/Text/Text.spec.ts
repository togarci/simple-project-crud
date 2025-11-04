import { describe, it, expect } from 'vitest';

import InputText from './index.vue';
import { mount } from '@vue/test-utils';

describe('ShareInputText', () => {
  it('should render a basic input and update model value', async () => {
    const wrapper = await mount(InputText, {
      props: {
        name: 'test-input',
        modelValue: '',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    const input = wrapper.find('[data-testId="input"]');
    expect(input.exists()).toBe(true);

    await input.setValue('Hello World');
    expect(wrapper.props('modelValue')).toBe('Hello World');
  });

  it('should render the label and required indicator', async () => {
    const wrapper = await mount(InputText, {
      props: {
        name: 'test-input',
        label: 'My Label',
        required: true,
      },
    });

    const label = wrapper.find('[data-testId="label-test"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain('My Label');

    const requiredSpan = wrapper.find('[data-testId="required-label"]');
    expect(requiredSpan.exists()).toBe(true);
    expect(requiredSpan.text()).toBe('(Obrigatório)');
  });

  it('should not render the label if prop is not provided', async () => {
    const wrapper = await mount(InputText, {
      props: {
        name: 'test-input',
      },
    });

    const label = wrapper.find('[data-testId="label-test"]');
    expect(label.exists()).toBe(false);
  });

  it('should display an error message and apply error styles', async () => {
    const wrapper = await mount(InputText, {
      props: {
        name: 'test-input',
        label: 'My Label',
        required: true,
        error: 'This field is required',
      },
    });

    const errorMessage = wrapper.find('[data-testId="error-message"]');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('This field is required');

    const label = wrapper.find('[data-testId="label-test"]');
    expect(label.classes()).toContain('text-error-700');

    const requiredSpan = wrapper.find('[data-testId="required-label"]');
    expect(requiredSpan.classes()).toContain('text-error-500');

    const inputWrapper = wrapper.find('.border');
    expect(inputWrapper.classes()).toContain('border-error-500');
  });

  it('should render with a placeholder', async () => {
    const wrapper = await mount(InputText, {
      props: {
        name: 'test-input',
        placeholder: 'Enter your name',
      },
    });

    const input = wrapper.find<HTMLInputElement>('[data-testId="input"]');
    expect(input.attributes('placeholder')).toBe('Enter your name');
  });

  it('should be disabled when disabled prop is true', async () => {
    const wrapper = await mount(InputText, {
      props: {
        name: 'test-input',
        disabled: true,
      },
    });

    const input = wrapper.find<HTMLInputElement>('[data-testId="input"]');
    expect(input.element.disabled).toBe(true);
  });
});
