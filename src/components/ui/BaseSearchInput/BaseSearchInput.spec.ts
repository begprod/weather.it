import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Search } from 'lucide-vue-next';
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
        Search,
      },
    },
    attachTo: document.body,
  });

  it('should contain input, placeholder, icons', () => {
    const inputElement = wrapper.find('[data-test-id="search-input"]');
    const inputPlaceholder = wrapper.find('[data-test-id="search-input-placeholder"]');

    expect(inputElement.exists()).toBe(true);
    expect(inputPlaceholder.exists()).toBe(true);
    expect(wrapper.findComponent(Search).exists()).toBe(true);
  });

  it('should contain data from props on input', () => {
    const inputElement = wrapper.find('input');

    expect(inputElement.attributes('id')).toBe('some-id');
    expect(inputElement.attributes('type')).toBe('text');
  });

  it('should contain placeholder from props', () => {
    const inputPlaceholder = wrapper.find('[data-test-id="search-input-placeholder"]');

    expect(inputPlaceholder.html()).toContain('Search');
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
