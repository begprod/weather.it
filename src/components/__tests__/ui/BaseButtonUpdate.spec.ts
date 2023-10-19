import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { HiRefresh } from 'oh-vue-icons/icons';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseButtonUpdate from '@/components/ui/BaseButtonUpdate.vue';

addIcons(HiRefresh);

describe('BaseButtonUpdate', () => {
  const wrapper = mount(BaseButtonUpdate, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
      components: {
        'v-icon': OhVueIcon,
      },
    },
  });

  const commonStore = useCommonStore();
  const weatherStore = useWeatherStore();
  const { status } = storeToRefs(commonStore);
  const { lastUpdateDate } = storeToRefs(weatherStore);
  const { updateCityData } = weatherStore;

  it('correct call update function on click', async () => {
    const button = wrapper.find('button');

    await button.trigger('click');

    expect(updateCityData).toHaveBeenCalled();
  });

  it('correct render updated date, if date set in store', async () => {
    lastUpdateDate.value = '07.07.07, 07:07';

    await nextTick();

    expect(wrapper.html()).toContain('07.07.07, 07:07');
  });

  it('correct does not render update date, if date not set in store', async () => {
    lastUpdateDate.value = '';

    await nextTick();

    const span = wrapper.find('span');

    expect(span.exists()).toBe(false);
  });

  it('correct set class animate-spin to icon, if update in progress', async () => {
    status.value = 'updating';

    await nextTick();

    const svg = wrapper.find('svg');

    expect(svg.classes()).toContain('animate-spin');
  });
});