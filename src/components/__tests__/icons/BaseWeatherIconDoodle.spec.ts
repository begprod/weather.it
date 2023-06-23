import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseWeatherIconDoodle from '@/components/icons/BaseWeatherIconDoodle.vue';

describe('BaseWeatherIconDoodle', () => {
  it('correct icons render', async () => {
    const wrapper = mount(BaseWeatherIconDoodle);

    expect(wrapper.html()).toContain('weather-icon_clear');
    expect(wrapper.html()).toContain('weather-icon_clouds');
    expect(wrapper.html()).toContain('weather-icon_snow');
    expect(wrapper.html()).toContain('weather-icon_mist');
  });
});
