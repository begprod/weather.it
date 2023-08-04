import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { IoSearch } from 'oh-vue-icons/icons';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSearchInput from '@/components/ui/BaseSearchInput.vue';

addIcons(IoSearch);

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
        'v-icon': OhVueIcon,
      },
    },
  });

  it('correct render', async () => {
    expect(wrapper.html()).toContain('some-id');
    expect(wrapper.html()).toContain('Search');
    expect(wrapper.find('input').attributes('type')).toBe('text');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search');
  });
});
