import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useWeatherStore } from '@/stores';
import { MapPinIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';
import BaseWeatherIcon from '@/components/ui/BaseWeatherIcon/BaseWeatherIcon.vue';
import BaseCardCity from '@/components/ui/BaseCardCity/BaseCardCity.vue';
import BaseDropdownMenu from '@/components/ui/BaseDropdownMenu/BaseDropdownMenu.vue';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton/BaseCardCitySkeleton.vue';

describe('BaseCardCity', () => {
  const wrapper = mount(BaseCardCity, {
    props: {
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
    },
    global: {
      directives: {
        'click-outside': clickOutside,
      },
      components: {
        MapPinIcon,
        XMarkIcon,
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

  it('should contain BaseButton component', () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('should render data from props', async () => {
    expect(wrapper.html()).toContain('Tokyo');
    expect(wrapper.html()).toContain('Japan');
    expect(wrapper.html()).toContain('clear sky');
  });

  it('should call function on click delete button', async () => {
    const dropdownMenu = wrapper.findComponent(BaseDropdownMenu);

    await dropdownMenu.find('button').trigger('click');

    await dropdownMenu.find('button.w-full').trigger('click');

    expect(deleteCity).toHaveBeenCalled();
  });

  it('should set css classes which depends of air quality', async () => {
    await wrapper.setProps({
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
          air_quality: 1,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: false,
    });

    expect(wrapper.html()).toContain('bg-green-500');

    await wrapper.setProps({
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
          air_quality: 2,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: false,
    });

    expect(wrapper.html()).toContain('bg-green-300');

    await wrapper.setProps({
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
          air_quality: 3,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: false,
    });

    expect(wrapper.html()).toContain('bg-yellow-300');

    await wrapper.setProps({
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
          air_quality: 4,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: false,
    });

    expect(wrapper.html()).toContain('bg-orange-400');

    await wrapper.setProps({
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
          air_quality: 5,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: false,
    });

    expect(wrapper.html()).toContain('bg-red-500');

    await wrapper.setProps({
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
          air_quality: null,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: false,
    });

    expect(wrapper.html()).toContain('bg-gray-400');
  });

  it('should set background image', async () => {
    expect(wrapper.html()).toContain('https://loremflickr.com/500/500?random=1');
  });

  it('should show skeleton if props isLoading true', async () => {
    await wrapper.setProps({
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
          air_quality: 1,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: true,
    });

    expect(wrapper.findComponent(BaseCardCitySkeleton).exists()).toBe(true);
  });

  it('should not show skeleton if props isLoading false', async () => {
    await wrapper.setProps({
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
          air_quality: 1,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      image: 'https://loremflickr.com/500/500?random=1',
      isLoading: false,
    });
    expect(wrapper.findComponent(BaseCardCitySkeleton).exists()).toBe(false);
  });

  it('should contain icons components', () => {
    expect(wrapper.findComponent(MapPinIcon).exists()).toBe(true);
    expect(wrapper.findComponent(XMarkIcon).exists()).toBe(true);
  });
});
