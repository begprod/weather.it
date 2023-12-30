import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import { useCommonStore, useWeatherStore } from '@/stores';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';
import BaseButtonUpdate from '@/components/BaseButtonUpdate/BaseButtonUpdate.vue';

describe('BaseButtonUpdate', () => {
  const wrapper = mount(BaseButtonUpdate, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
      components: {
        ArrowPathIcon,
        BaseButton,
      },
    },
  });

  const commonStore = useCommonStore();
  const weatherStore = useWeatherStore();
  const { status } = storeToRefs(commonStore);
  const { lastUpdateDate } = storeToRefs(weatherStore);
  const { updateCityData } = weatherStore;

  it('should have BaseButton component', () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('should call update function on click', async () => {
    const button = wrapper.find('button');

    await button.trigger('click');

    expect(updateCityData).toHaveBeenCalled();
  });

  it('should render updated date, if date set in store', async () => {
    lastUpdateDate.value = '07.07.07, 07:07';

    await nextTick();

    expect(wrapper.html()).toContain('07.07.07, 07:07');
  });

  it('should does not render update date, if date not set in store', async () => {
    lastUpdateDate.value = '';

    await nextTick();

    const span = wrapper.find('span');

    expect(span.exists()).toBe(false);
  });

  it('should set class animate-spin to icon, if update in progress', async () => {
    status.value = 'updating';

    await nextTick();

    const svg = wrapper.find('svg');

    expect(svg.classes()).toContain('animate-spin');
  });

  it('should contain icon component', () => {
    expect(wrapper.findComponent(ArrowPathIcon).exists()).toBe(true);
  });
});
