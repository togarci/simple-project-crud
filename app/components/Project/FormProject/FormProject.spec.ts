import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import FormProject from './index.vue';
import yup from 'yup';
import Text from '~/components/Share/Input/Text/index.vue';
import InputDate from '~/components/Share/Input/Date/index.vue';

import Schema from './schema';

describe('FormProject', () => {
  let wrapper: ReturnType<typeof mount>;

  const initFormValuesMock = {
    id: '1',
    name: 'Projeto Teste',
    client: 'Cliente Teste',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
  };

  const mountComponent = (props = {}) => {
    return mount(FormProject, {
      props: {
        isLoading: false,
        ...props,
      },
    });
  };

  describe('Rendering and Initial State', () => {
    it('renders the form fields', () => {
      wrapper = mountComponent();
      const textInput = wrapper.findAllComponents(Text);
      expect(textInput).toHaveLength(2);

      const dataInput = wrapper.findAllComponents(InputDate);
      expect(dataInput).toHaveLength(2);

      const button = wrapper.find('button[type="submit"]');
      expect(button.text()).toBe('Salvar projeto');
      expect(button.attributes('disabled')).toBeFalsy();
    });

    it('starts with empty fields when initFormValues is not provided', () => {
      wrapper = mountComponent();
      const inputs = wrapper.findAllComponents(Text);
      inputs.forEach((input) => {
        expect(input.props('modelValue')).toBe('');
      });
    });

    it('starts with initFormValues values when provided', async () => {
      wrapper = mountComponent({ initFormValues: initFormValuesMock });
      await wrapper.vm.$nextTick();

      const textInputs = wrapper.findAllComponents(Text);
      expect(textInputs[0]?.props('modelValue')).toBe('Projeto Teste');
      expect(textInputs[1]?.props('modelValue')).toBe('Cliente Teste');

      const dateInputs = wrapper.findAllComponents(InputDate);
      expect(dateInputs[0]?.props('modelValue')).toBe('2023-01-01');
      expect(dateInputs[1]?.props('modelValue')).toBe('2023-12-31');
    });
  });

  describe('Interaction and Submission', () => {
    beforeEach(() => {
      wrapper = mountComponent();
    });

    it('emits the "submit" event with the correct data', async () => {
      const textInputs = wrapper.findAllComponents(Text);
      await textInputs[0]?.setValue('Projeto Teste');
      await textInputs[1]?.setValue('Cliente Teste');

      const dateInputs = wrapper.findAllComponents(Date);
      await dateInputs[0]?.setValue('2023-01-01');
      await dateInputs[1]?.setValue('2023-12-31');

      // @ts-ignore
      await wrapper.vm.submit();
      await flushPromises();

      expect(wrapper.emitted()).toHaveProperty('submit');
      const emittedPayload = wrapper.emitted('submit')?.[0]?.[0];

      expect(emittedPayload).toEqual({
        name: 'Projeto Teste',
        client: 'Cliente Teste',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
      });
    });

    it('test validation date fields', async () => {
      const textInputs = wrapper.findAllComponents(Text);
      await textInputs[0]?.setValue('Projeto');
      await textInputs[1]?.setValue('Cliente');

      const dateInput: any[] = wrapper.findAllComponents(Date);
      await dateInput[0].setValue('2023-10-10');
      await dateInput[1].setValue('2023-01-01');

      await wrapper.vm.$nextTick();
      await flushPromises();

      const submitButton = wrapper.find('button[type="submit"]');
      expect(submitButton.attributes('disabled')).toBeFalsy();
    });
  });

  describe('Valitate schema', () => {
    it('should validate schema data', async () => {
      const validData = {
        name: 'Projeto Teste',
        client: 'Cliente',
        startDate: new Date('2023-10-10'),
        endDate: new Date('2023-11-11'),
      };

      await expect(Schema.validate(validData)).resolves.toEqual(validData);
    });

    it('should not validate name field', async () => {
      let emptyName = {
        name: '',
        client: 'Cliente',
        startDate: '2023-10-10',
        endDate: '2023-11-11',
      };
      await expect(Schema.validate(emptyName)).rejects.toThrow('O nome do projeto é obrigatório');

      emptyName = {
        name: 'Projeto',
        client: 'Cliente',
        startDate: '2023-10-10',
        endDate: '2023-11-11',
      };
      await expect(Schema.validate(emptyName)).rejects.toThrow('Digite ao menos duas palavras.');
    });

    it('should not validate client field', async () => {
      let emptyName = {
        name: 'Projeto Teste',
        client: '',
        startDate: '2023-10-10',
        endDate: '2023-11-11',
      };
      await expect(Schema.validate(emptyName)).rejects.toThrow('O nome do cliente é obrigatório.');
    });

    it('should not validate date field', async () => {
      let emptyName: any = {
        name: 'Projeto Teste',
        client: 'Cliente Teste',
        startDate: null,
        endDate: '2023-11-11',
      };
      await expect(Schema.validate(emptyName)).rejects.toThrow('A data de início é obrigatória.');

      emptyName = {
        name: 'Projeto Teste',
        client: 'Cliente Teste',
        startDate: '2023-10-10',
        endDate: null,
      };
      await expect(Schema.validate(emptyName)).rejects.toThrow('A data final é obrigatória.');

      emptyName = {
        name: 'Projeto Teste',
        client: 'Cliente Teste',
        startDate: '2023-10-10',
        endDate: '2021-11-11',
      };
      await expect(Schema.validate(emptyName)).rejects.toThrow('A data final não pode ser anterior à data de início.');
    });
  });
});
