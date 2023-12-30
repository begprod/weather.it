import { storeToRefs } from 'pinia';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useCommonStore, useWeatherStore } from '@/stores';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseCardGrid from '@/components/BaseCardGrid/BaseCardGrid.vue';
import BaseCardCity from '@/components/ui/BaseCardCity/BaseCardCity.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton/BaseCardCitySkeleton.vue';

describe('BaseCardGrid', () => {
  const wrapper = mount(BaseCardGrid, {
    global: {
      directives: {
        'click-outside': clickOutside,
      },
      components: {
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

  it('should contain BaseCardCity component', async () => {
    expect(wrapper.findComponent(BaseCardCity).exists()).toBe(true);
  });

  it('should contain BaseCardCitySkeleton component if state is loading', async () => {
    status.value = 'loading';

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(BaseCardCitySkeleton).exists()).toBe(true);
  });

  it('should render data from store', async () => {
    status.value = 'success';

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('Tokyo');
    expect(wrapper.html()).toContain('Japan');
    expect(wrapper.html()).toContain('20');
    expect(wrapper.html()).toContain('25');
    expect(wrapper.html()).toContain('clear sky');
  });
});
