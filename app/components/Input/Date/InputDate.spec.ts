import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import InputDate from './index.vue';

describe('InputDate', () => {
  it('should render the label and required indicator when provided', async () => {
    const wrapper = await mount(InputDate, {
      props: {
        name: 'start-date',
        label: 'Data de Início',
        required: true,
      },
    });

    const label = wrapper.find('[data-testId="label-test"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain('Data de Início');

    const requiredSpan = wrapper.find('[data-testId="required-label"]');
    expect(requiredSpan.exists()).toBe(true);
    expect(requiredSpan.text()).toBe('(Obrigatório)');
  });

  it('should not render the label if not provided', async () => {
    const wrapper = await mount(InputDate, {
      props: {
        name: 'start-date',
      },
    });

    expect(wrapper.find('[data-testId="label-test"]').exists()).toBe(false);
  });

  it('should display the formatted date when model has a value', async () => {
    const wrapper = await mount(InputDate, {
      props: {
        name: 'start-date',
        modelValue: '2024-07-26', // v-model
      },
    });

    const dateValue = wrapper.find('[date-testId="date-value"]');
    expect(dateValue.exists()).toBe(true);
    // O componente usa toLocaleDateString com UTC, então o resultado é consistente.
    expect(dateValue.text()).toBe('26/07/2024');
  });

  it('should not display the date when model is empty', async () => {
    const wrapper = await mount(InputDate, {
      props: {
        name: 'start-date',
      },
    });

    expect(wrapper.find('[date-testId="date-value"]').exists()).toBe(false);
  });

  it('should show an error message and apply error classes', async () => {
    const wrapper = await mount(InputDate, {
      props: {
        name: 'start-date',
        label: 'Data de Início',
        error: 'Campo inválido',
      },
    });

    const errorMessage = wrapper.find('[data-testId="error-message"]');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Campo inválido');

    expect(wrapper.find('[data-testId="label-test"]').classes()).toContain('text-error-700');
    expect(wrapper.find('.border').classes()).toContain('border-error-500');
  });

  it('should update the v-model when the date input changes', async () => {
    const wrapper = await mount(InputDate, {
      props: {
        name: 'start-date',
        modelValue: '2024-07-25',
        'onUpdate:modelValue': (value: string) => {
          wrapper.setProps({ modelValue: value });
        },
      },
    });

    const dateInput = wrapper.find('[data-testId="date-input-test"]');
    await dateInput.setValue('2024-08-01');

    expect(wrapper.props('modelValue')).toEqual('2024-08-01');
  });

  it('should be disabled when the disabled prop is true', async () => {
    const wrapper = await mount(InputDate, {
      props: {
        name: 'start-date',
        disabled: true,
      },
    });

    expect(wrapper.find('[data-testId="date-input-test"]').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.border').classes()).toContain('cursor-not-allowed');
  });
});
