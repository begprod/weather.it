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
    const name = wrapper.find('[data-test-id="suggestion-city-name"]');
    const country = wrapper.find('[data-test-id="suggestion-city-country"]');

    await wrapper.setProps({
      name: 'Tokyo',
      country: 'Japan',
    });

    expect(name.html()).toContain('Tokyo');
    expect(country.html()).toContain('Japan');
  });

  it('should emit click event', async () => {
    const suggestionItem = wrapper.find('[data-test-id="suggestion-item"]');

    await suggestionItem.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should contain icons components', async () => {
    expect(wrapper.findComponent(MapPinIcon).exists()).toBe(true);
    expect(wrapper.findComponent(GlobeAsiaAustraliaIcon).exists()).toBe(true);
  });
});
