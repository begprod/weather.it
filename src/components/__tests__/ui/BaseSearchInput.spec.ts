import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { IoSearch, MdKeyboardcommandkeyRound } from 'oh-vue-icons/icons';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSearchInput from '@/components/ui/BaseSearchInput.vue';

addIcons(IoSearch, MdKeyboardcommandkeyRound);

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
    attachTo: document.body,
  });

  it('correct render input, placeholder, icons', async () => {
    expect(wrapper.find('.input').exists()).toBe(true);
    expect(wrapper.find('.placeholder').exists()).toBe(true);
    expect(wrapper.findComponent(OhVueIcon).exists()).toBe(true);
  });

  it('correct render data from props', async () => {
    expect(wrapper.html()).toContain('some-id');
    expect(wrapper.html()).toContain('Search');
    expect(wrapper.find('input').attributes('type')).toBe('text');
    expect(wrapper.find('.placeholder span').text()).toBe('Search');
  });

  it('correct focus on input with cmd/ctrl + k shortcut', async () => {
    await wrapper.trigger('keydown', {
      code: 'KeyK',
      metaKey: true,
      ctrlKey: true,
    });

    const inputElement = wrapper.find('input');

    expect(inputElement.element).toBe(document.activeElement);
  });
});
