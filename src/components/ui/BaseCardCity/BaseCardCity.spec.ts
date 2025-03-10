import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useWeatherStore } from '@/stores';
import { MapPin, SquareX } from 'lucide-vue-next';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseCardCity from '@/components/ui/BaseCardCity/BaseCardCity.vue';
import { nextTick } from 'vue';

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
          localTime: '10:30',
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
          MapPin,
          SquareX,
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
    const cityCountryAndLocalTime = wrapper.find('[data-test-id="city-country-local-time"]');
    const weatherDescription = wrapper.find('[data-test-id="weather-description"]');

    expect(cityName.text()).toBe('Tokyo');
    expect(cityCountryAndLocalTime.text()).toBe('Japan, 10:30');
    expect(weatherDescription.text()).toBe('clear sky');
  });

  it('should call function on click delete button', async () => {
    const { deleteCity } = weatherStore;
    const dropdownMenuButton = wrapper.find('[data-test-id="dropdown-menu-trigger"]');

    await dropdownMenuButton.trigger('click');

    const deleteButton = wrapper.find('[data-test-id="remove-city-button"]');

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
        localTime: '10:30',
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

    expect(cityAirQuality.html()).toContain('air-quality_type_1');

    await wrapper.setProps({
      city: {
        id: 'card-city-test',
        name: 'Tokyo',
        country: 'Japan',
        country_code: 'JP',
        lon: 139.6917,
        lat: 35.6895,
        localTime: '10:30',
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

    expect(cityAirQuality.html()).toContain('air-quality_type_2');

    await wrapper.setProps({
      city: {
        id: 'card-city-test',
        name: 'Tokyo',
        country: 'Japan',
        country_code: 'JP',
        lon: 139.6917,
        lat: 35.6895,
        localTime: '10:30',
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

    expect(cityAirQuality.html()).toContain('air-quality_type_3');

    await wrapper.setProps({
      city: {
        id: 'card-city-test',
        name: 'Tokyo',
        country: 'Japan',
        country_code: 'JP',
        lon: 139.6917,
        lat: 35.6895,
        localTime: '10:30',
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

    expect(cityAirQuality.html()).toContain('air-quality_type_4');

    await wrapper.setProps({
      city: {
        id: 'card-city-test',
        name: 'Tokyo',
        country: 'Japan',
        country_code: 'JP',
        lon: 139.6917,
        lat: 35.6895,
        localTime: '10:30',
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

    expect(cityAirQuality.html()).toContain('air-quality_type_5');

    await wrapper.setProps({
      city: {
        id: 'card-city-test',
        name: 'Tokyo',
        country: 'Japan',
        country_code: 'JP',
        lon: 139.6917,
        lat: 35.6895,
        localTime: '10:30',
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

    expect(cityAirQuality.html()).toContain('air-quality_type_default');
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
        localTime: '10:30',
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
        localTime: '10:30',
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

  it('should contain icons components', async () => {
    wrapper.vm.toggleMenu();

    await nextTick();

    expect(wrapper.findComponent(MapPin).exists()).toBe(true);
    expect(wrapper.findComponent(SquareX).exists()).toBe(true);
  });
});
