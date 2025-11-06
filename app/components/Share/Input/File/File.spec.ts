import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'vue3-toastify';
import InputFile from './index.vue';
import IconUpload from '~/components/Share/Icon/UploadSVG.vue';
import IconTrash from '~/components/Share/Icon/TrashSVG.vue';
import Button from '~/components/Share/Button/index.vue';

vi.mock('vue3-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    POSITION: {
      TOP_CENTER: 'top-center',
    },
  },
}));

describe('InputFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn((file: File) => `blob:${file.name}`);
  });

  it('should render the initial upload state correctly', () => {
    const wrapper = mount(InputFile, {
      props: {
        limitMbSize: 5,
        modelValue: null,
      },
      global: {
        stubs: {
          IconUpload,
          Button,
        },
      },
    });

    expect(wrapper.find('p').text()).toContain('Escolha uma imagem .jpg ou .png no seu dispositivo');
    expect(wrapper.findComponent(Button).text()).toBe('Selecionar');
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('should emit "update:modelValue" with the file URL when selecting a valid image', async () => {
    const wrapper = mount(InputFile, {
      props: {
        limitMbSize: 5,
        modelValue: null,
      },
    });

    const fileContent = 'dummy content';
    const file = new File([fileContent], 'small-image.png', { type: 'image/png' });
    const dataUrl = 'data:image/png;base64,ZHVtbXkgY29udGVudA==';

    // Simula o FileReader para controlar o comportamento assíncrono
    const readerMock = vi.spyOn(window, 'FileReader').mockImplementation(
      () =>
        ({
          readAsDataURL: vi.fn(function (this: FileReader) {
            if (this.onload) {
              this.onload({ target: { result: dataUrl } } as ProgressEvent<FileReader>);
            }
          }),
        }) as any
    );

    const input = wrapper.find<HTMLInputElement>('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: true,
    });

    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([dataUrl]);

    readerMock.mockRestore();
  });

  it('should display an error if the file exceeds the size limit', async () => {
    const limitMb = 1;
    const wrapper = mount(InputFile, {
      props: {
        limitMbSize: limitMb,
        modelValue: null,
      },
    });

    const largeFile = new File(['a'.repeat(2 * 1024 * 1024)], 'large.png', { type: 'image/png' });
    const input = wrapper.find<HTMLInputElement>('input[type="file"]');

    await vi.spyOn(input.element, 'files', 'get').mockReturnValue([largeFile] as any);
    await input.trigger('change');

    expect(toast.error).toHaveBeenCalledWith(`Tamanho excedido! A imagem deve ter no máximo ${limitMb} MB.`, {
      position: 'top-center',
    });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should display the image and remove button when "modelValue" is provided', () => {
    const imageUrl = 'blob:image.png';
    const wrapper = mount(InputFile, {
      props: {
        limitMbSize: 5,
        modelValue: imageUrl,
      },
      global: {
        stubs: {
          IconTrash,
        },
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(imageUrl);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should emit "update:modelValue" with an empty value when clicking remove', async () => {
    const wrapper = mount(InputFile, {
      props: { limitMbSize: 5, modelValue: 'blob:image.png' },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
  });
});
