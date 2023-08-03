import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  FaMapPin,
  RiLoaderLine,
  IoSearch,
  LaGlobeAsiaSolid,
  MdLocationoffTwotone,
} from 'oh-vue-icons/icons';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseWeatherIconDoodle from '@/components/icons/BaseWeatherIconDoodle.vue';
import BaseSearchInput from '@/components/ui/BaseSearchInput.vue';
import BaseSearchBar from '@/components/ui/BaseSearchBar.vue';

addIcons(FaMapPin, IoSearch, RiLoaderLine, LaGlobeAsiaSolid, MdLocationoffTwotone);

describe('BaseSearchBar', () => {
  const wrapper = mount(BaseSearchBar, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn(),
        }),
      ],
      components: {
        'v-icon': OhVueIcon,
        BaseWeatherIconDoodle,
        BaseSearchInput,
      },
    },
  });

  it('correct render doodle', async () => {
    expect(wrapper.findComponent(BaseWeatherIconDoodle).exists()).toBe(true);
  });

  it('correct render input', async () => {
    expect(wrapper.findComponent(BaseSearchInput).exists()).toBe(true);
  });

  it('correct render spinner', async () => {
    // @ts-ignore
    wrapper.vm.searchQuery = 'some city';

    await wrapper.vm.$nextTick();

    const svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
    expect(wrapper.find('.animate-spin').exists()).toBe(true);
    expect(svg.classes()).toContain('ov-icon');
  });

  it('correct show city not found', async () => {
    // @ts-ignore
    wrapper.vm.isSearching = false;
    // @ts-ignore
    wrapper.vm.citiesSuggestions = [];
    // @ts-ignore
    wrapper.vm.searchQuery = 'some city';

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('City not found');
  });

  it('correct render city list', async () => {
    // @ts-ignore
    wrapper.vm.isSearching = false;
    // @ts-ignore
    wrapper.vm.citiesSuggestions = [
      {
        id: 'some-id',
        name: 'Tokyo',
        country: 'Japan',
        country_code: 'JP',
        lon: 139.6917,
        lat: 35.6895,
      },
    ];
    // @ts-ignore
    wrapper.vm.searchQuery = 'some city';

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('Tokyo');
    expect(wrapper.html()).toContain('Japan');
  });
});
