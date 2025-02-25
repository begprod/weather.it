import { storeToRefs } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseLayoutDefault from '@/components/layouts/BaseLayoutDefault/BaseLayoutDefault.vue';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault/BaseFooterDefault.vue';
import BaseGithubCorner from '@/components/ui/BaseGithubCorner/BaseGithubCorner.vue';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';
import BaseButtonUpdate from '@/components/BaseButtonUpdate/BaseButtonUpdate.vue';
import { nextTick } from 'vue';

describe('BaseFooterDefault', () => {
  const wrapper = mount(BaseLayoutDefault, {
    global: {
      components: {
        BaseFooterDefault,
        BaseGithubCorner,
        BaseToast,
        BaseButtonUpdate,
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  });

  const commonStore = useCommonStore();
  const weatherStore = useWeatherStore();
  const { cities } = storeToRefs(weatherStore);
  const { isToastVisible } = storeToRefs(commonStore);

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

  it('should contain components', async () => {
    isToastVisible.value = true;

    await nextTick();

    expect(wrapper.findComponent(BaseFooterDefault).exists()).toBe(true);
    expect(wrapper.findComponent(BaseGithubCorner).exists()).toBe(true);
    expect(wrapper.findComponent(BaseToast).exists()).toBe(true);
    expect(wrapper.findComponent(BaseButtonUpdate).exists()).toBe(true);
  });
});
