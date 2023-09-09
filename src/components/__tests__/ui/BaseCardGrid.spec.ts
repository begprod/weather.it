import { storeToRefs } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaCircle, FaMapMarkerAlt, HiDotsVertical, RiCelsiusLine } from 'oh-vue-icons/icons';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useCommonStore, useWeatherStore } from '@/stores';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseCardGrid from '@/components/ui/BaseCardGrid.vue';
import BaseCardCity from '@/components/ui/BaseCardCity.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton.vue';

addIcons(FaCircle, FaMapMarkerAlt, HiDotsVertical, RiCelsiusLine);

describe('BaseCardGrid', () => {
  const wrapper = mount(BaseCardGrid, {
    global: {
      directives: {
        'click-outside': clickOutside,
      },
      components: {
        'v-icon': OhVueIcon,
        BaseCardCity,
        BaseCardCitySkeleton,
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn(),
        }),
      ],
    },
  });

  const commonStore = useCommonStore();
  const weatherStore = useWeatherStore();
  const { status } = storeToRefs(commonStore);
  const { cities } = storeToRefs(weatherStore);

  cities.value = [
    {
      id: 'cards-grid-test',
      name: 'Tokyo',
      country: 'Japan',
      country_code: 'JP',
      lon: 139.6917,
      lat: 35.6895,
      weather: {
        current: 20,
        feels_like: 25,
        air_quality: 1 || null,
        main: 'Clear',
        description: 'clear sky',
      },
    },
  ];

  it('correct render BaseCardCity data from store', async () => {
    expect(wrapper.findComponent(BaseCardCity).exists()).toBe(true);
  });

  it('correct render BaseCardCitySkeleton data from store', async () => {
    status.value = 'loading';
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(BaseCardCitySkeleton).exists()).toBe(true);
  });
});
