import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaCircle, FaMapMarkerAlt, IoClose, RiCelsiusLine } from 'oh-vue-icons/icons';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useWeatherStore } from '@/stores';
import BaseWeatherIcon from '@/components/icons/BaseWeatherIcon.vue';
import BaseCardCity from '@/components/ui/BaseCardCity.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton.vue';

addIcons(FaCircle, FaMapMarkerAlt, IoClose, RiCelsiusLine);

describe('BaseCardCity', () => {
  const propsData = {
    city: {
      id: 'some-id',
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
    image: 'https://loremflickr.com/500/500?random=1',
    isLoading: false,
  };

  const wrapper = mount(BaseCardCity, {
    props: {
      ...propsData,
    },
    global: {
      components: {
        'v-icon': OhVueIcon,
        BaseWeatherIcon,
        BaseCardCitySkeleton,
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn(),
        }),
      ],
    },
  });

  const weatherStore = useWeatherStore();

  it('correct render data from props', async () => {
    await wrapper.setProps({
      ...propsData,
    });

    expect(wrapper.html()).toContain('Tokyo');
    expect(wrapper.html()).toContain('Japan');
    expect(wrapper.html()).toContain('clear sky');
  });

  it('correct call function on delete button click', async () => {
    const deleteCitySpy = vi.spyOn(weatherStore, 'removeCity');

    const button = wrapper.find('button');

    await button.trigger('click');

    expect(deleteCitySpy).toHaveBeenCalled();
  });

  it('correct css class which depends of air quality', async () => {
    await wrapper.setProps({
      city: {
        ...propsData,
        weather: {
          ...propsData.city.weather,
          air_quality: 1,
        },
      },
    });

    expect(wrapper.html()).toContain('fill-green-500');

    await wrapper.setProps({
      city: {
        ...propsData,
        weather: {
          ...propsData.city.weather,
          air_quality: 2,
        },
      },
    });

    expect(wrapper.html()).toContain('fill-green-300');

    await wrapper.setProps({
      city: {
        ...propsData,
        weather: {
          ...propsData.city.weather,
          air_quality: 3,
        },
      },
    });

    expect(wrapper.html()).toContain('fill-yellow-300');

    await wrapper.setProps({
      city: {
        ...propsData,
        weather: {
          ...propsData.city.weather,
          air_quality: 4,
        },
      },
    });

    expect(wrapper.html()).toContain('fill-orange-400');

    await wrapper.setProps({
      city: {
        ...propsData,
        weather: {
          ...propsData.city.weather,
          air_quality: 5,
        },
      },
    });

    expect(wrapper.html()).toContain('fill-red-500');

    await wrapper.setProps({
      city: {
        ...propsData,
        weather: {
          ...propsData.city.weather,
          air_quality: null,
        },
      },
    });

    expect(wrapper.html()).toContain('fill-gray-400');
  });

  it('correct background image', async () => {
    await wrapper.setProps({
      ...propsData,
      image: 'https://loremflickr.com/500/500?random=1',
    });

    expect(wrapper.html()).toContain('https://loremflickr.com/500/500?random=1');
  });

  it('correct show skeleton if props isLoading true', async () => {
    await wrapper.setProps({
      ...propsData,
      isLoading: true,
    });

    expect(wrapper.findComponent(BaseCardCitySkeleton).exists()).toBe(true);
  });

  it('correct show skeleton if props isLoading false', async () => {
    await wrapper.setProps({
      ...propsData,
      isLoading: false,
    });

    expect(wrapper.findComponent(BaseCardCitySkeleton).exists()).toBe(false);
  });
});
