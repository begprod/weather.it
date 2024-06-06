import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useWeatherStore } from '@/stores';
import { MapPinIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseCardCity from '@/components/ui/BaseCardCity/BaseCardCity.vue';

describe('BaseCardCity', () => {
  let wrapper: ComponentWrapperType<typeof BaseCardCity>;
  let weatherStore: ReturnType<typeof useWeatherStore>;

  const createComponent = () => {
    wrapper = mount(BaseCardCity, {
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
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
  };

  beforeEach(() => {
    createComponent();

    weatherStore = useWeatherStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render data from props', async () => {
    const cityName = wrapper.find('[data-test-id="city-name"]');
    const cityCountry = wrapper.find('[data-test-id="city-country"]');
    const weatherDescription = wrapper.find('[data-test-id="weather-description"]');

    expect(cityName.text()).toBe('Tokyo');
    expect(cityCountry.text()).toBe('Japan');
    expect(weatherDescription.text()).toBe('clear sky');
  });

  it('should call function on click delete button', async () => {
    const { deleteCity } = weatherStore;
    const dropdownMenuButton = wrapper.find('[data-test-id="dropdown-menu-button"]');

    await dropdownMenuButton.trigger('click');

    const deleteButton = wrapper.find('[data-test-id="delete-city-button"]');

    await deleteButton.trigger('click');

    expect(deleteCity).toHaveBeenCalled();
  });

  it('should set css classes which depends of air quality', async () => {
    const cityAirQuality = wrapper.find('[data-test-id="city-air"]');

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

    expect(cityAirQuality.html()).toContain('bg-green-500');

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

    expect(cityAirQuality.html()).toContain('bg-green-300');

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

    expect(cityAirQuality.html()).toContain('bg-yellow-300');

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

    expect(cityAirQuality.html()).toContain('bg-orange-400');

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

    expect(cityAirQuality.html()).toContain('bg-red-500');

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

    expect(cityAirQuality.html()).toContain('bg-gray-400');
  });

  it('should set background image', async () => {
    const cityImage = wrapper.find('[data-test-id="city-image"]');

    expect(cityImage.html()).toContain('https://loremflickr.com/500/500?random=1');
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

    const skeleton = wrapper.find('[data-test-id="skeleton-card-city"]');

    expect(skeleton.exists()).toBe(true);
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

    const skeleton = wrapper.find('[data-test-id="skeleton-card-city"]');

    expect(skeleton.exists()).toBe(false);
  });

  it('should contain icons components', () => {
    expect(wrapper.findComponent(MapPinIcon).exists()).toBe(true);
    expect(wrapper.findComponent(XMarkIcon).exists()).toBe(true);
  });
});
