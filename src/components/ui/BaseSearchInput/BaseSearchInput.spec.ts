import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import BaseSearchInput from '@/components/ui/BaseSearchInput/BaseSearchInput.vue';

describe('BaseSearchInput', () => {
  const wrapper = mount(BaseSearchInput, {
    props: {
      id: 'some-id',
      type: 'text',
      placeholder: 'Search',
      label: 'Search',
      modelValue: '',
    },
    global: {
      components: {
        MagnifyingGlassIcon,
      },
    },
    attachTo: document.body,
  });

  it('should render input, placeholder, icons', async () => {
    expect(wrapper.find('.input').exists()).toBe(true);
    expect(wrapper.find('.placeholder').exists()).toBe(true);
    expect(wrapper.findComponent(MagnifyingGlassIcon).exists()).toBe(true);
  });

  it('should contain data from props', async () => {
    expect(wrapper.html()).toContain('some-id');
    expect(wrapper.html()).toContain('Search');
    expect(wrapper.find('input').attributes('type')).toBe('text');
    expect(wrapper.find('.placeholder span').text()).toBe('Search');
  });

  it('should focus on input with cmd/ctrl + k shortcut', async () => {
    await wrapper.trigger('keydown', {
      code: 'KeyK',
      metaKey: true,
      ctrlKey: true,
    });

    const inputElement = wrapper.find('input');

    expect(inputElement.element).toBe(document.activeElement);
  });
});
