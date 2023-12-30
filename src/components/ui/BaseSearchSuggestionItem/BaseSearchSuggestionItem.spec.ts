import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { MapPinIcon, GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/solid';
import BaseSearchSuggestionItem from '@/components/ui/BaseSearchSuggestionItem/BaseSearchSuggestionItem.vue';

describe('BaseSearchSuggestionItem', () => {
  const wrapper = mount(BaseSearchSuggestionItem, {
    props: {
      name: 'Moscow',
      country: 'Russia',
    },
    global: {
      components: {
        MapPinIcon,
        GlobeAsiaAustraliaIcon,
      },
    },
  });

  it('should contain data from props', async () => {
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

  it('should contain icons components', async () => {
    expect(wrapper.findComponent(MapPinIcon).exists()).toBe(true);
    expect(wrapper.findComponent(GlobeAsiaAustraliaIcon).exists()).toBe(true);
  });
});
