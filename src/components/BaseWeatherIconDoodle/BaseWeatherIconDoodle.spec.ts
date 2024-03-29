import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseWeatherIconDoodle from '@/components/BaseWeatherIconDoodle/BaseWeatherIconDoodle.vue';

describe('BaseWeatherIconDoodle', () => {
  const wrapper = mount(BaseWeatherIconDoodle);

  it('should render icons', async () => {
    expect(wrapper.html()).toContain('weather-icon_clear');
    expect(wrapper.html()).toContain('weather-icon_clouds');
    expect(wrapper.html()).toContain('weather-icon_snow');
    expect(wrapper.html()).toContain('weather-icon_mist');
  });
});
