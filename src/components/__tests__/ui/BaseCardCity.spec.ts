import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  CoTrash,
  FaCircle,
  FaMapMarkerAlt,
  HiDotsVertical,
  RiCelsiusLine,
} from 'oh-vue-icons/icons';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useWeatherStore } from '@/stores';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseWeatherIcon from '@/components/icons/BaseWeatherIcon.vue';
import BaseCardCity from '@/components/ui/BaseCardCity.vue';
import BaseDropdownMenu from '@/components/ui/BaseDropdownMenu.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton.vue';

addIcons(CoTrash, FaCircle, FaMapMarkerAlt, HiDotsVertical, RiCelsiusLine);

describe('BaseCardCity', () => {
  const propsData = {
    city: {
      id: 'card-city-test',
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
      directives: {
        'click-outside': clickOutside,
      },
      components: {
        'v-icon': OhVueIcon,
        BaseWeatherIcon,
        BaseDropdownMenu,
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  });

  const weatherStore = useWeatherStore();
  const { deleteCity } = weatherStore;

  it('correct render data from props', async () => {
    await wrapper.setProps({
      ...propsData,
    });

    expect(wrapper.html()).toContain('Tokyo');
    expect(wrapper.html()).toContain('Japan');
    expect(wrapper.html()).toContain('clear sky');
  });

  it('correct call function on delete button click', async () => {
    const dropdownMenu = wrapper.findComponent(BaseDropdownMenu);

    await dropdownMenu.find('button').trigger('click');

    await dropdownMenu.find('button.w-full').trigger('click');

    expect(deleteCity).toHaveBeenCalled();
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

  it('correct contain BaseButton component', () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });
});
