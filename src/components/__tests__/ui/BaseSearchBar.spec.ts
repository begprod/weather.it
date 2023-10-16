import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  FaMapPin,
  RiLoaderLine,
  IoSearch,
  LaGlobeAsiaSolid,
  MdLocationoffTwotone,
  MdKeyboardcommandkeyRound,
} from 'oh-vue-icons/icons';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseWeatherIconDoodle from '@/components/icons/BaseWeatherIconDoodle.vue';
import BaseSearchInput from '@/components/ui/BaseSearchInput.vue';
import BaseSearchBar from '@/components/ui/BaseSearchBar.vue';

addIcons(
  FaMapPin,
  IoSearch,
  RiLoaderLine,
  LaGlobeAsiaSolid,
  MdLocationoffTwotone,
  MdKeyboardcommandkeyRound,
);

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
});
