import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseWeatherIconDoodle from '@/components/BaseWeatherIconDoodle/BaseWeatherIconDoodle.vue';
import BaseSearchInput from '@/components/ui/BaseSearchInput/BaseSearchInput.vue';
import BaseSearchBar from '@/components/BaseSearchBar/BaseSearchBar.vue';

describe('BaseSearchBar', () => {
  const wrapper = mount(BaseSearchBar, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
      components: {
        BaseWeatherIconDoodle,
        BaseSearchInput,
      },
    },
  });

  it('should contain BaseWeatherIconDoodle component', async () => {
    expect(wrapper.findComponent(BaseWeatherIconDoodle).exists()).toBe(true);
  });

  it('should contain BaseSearchInput component', async () => {
    expect(wrapper.findComponent(BaseSearchInput).exists()).toBe(true);
  });
});
