import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaMapPin, LaGlobeAsiaSolid } from 'oh-vue-icons/icons';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSearchSuggestionItem from '@/components/ui/BaseSearchSuggestionItem/BaseSearchSuggestionItem.vue';

addIcons(FaMapPin, LaGlobeAsiaSolid);

describe('BaseSearchSuggestionItem', () => {
  const wrapper = mount(BaseSearchSuggestionItem, {
    props: {
      name: 'Moscow',
      country: 'Russia',
    },
    global: {
      components: {
        'v-icon': OhVueIcon,
      },
    },
  });

  it('should render', async () => {
    expect(wrapper.html()).toContain('svg');
    expect(wrapper.html()).toContain('ov-icon');
  });

  it('should render data from props', async () => {
    await wrapper.setProps({
      name: 'Tokyo',
      country: 'Japan',
    });

    expect(wrapper.html()).toContain('Tokyo');
    expect(wrapper.html()).toContain('Japan');
  });

  it('should emit click event', async () => {
    const button = wrapper.find('.flex.items-center');

    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
