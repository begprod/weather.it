import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { WeatherType } from '@/types';
import BaseWeatherIcon from '@/components/icons/BaseWeatherIcon.vue';

describe('BaseWeatherIcon', () => {
  it('correct icons class names', async () => {
    const wrapper = mount(BaseWeatherIcon, {
      props: {
        type: 'clear',
      },
    });

    await wrapper.setProps({ type: WeatherType.Clear });
    expect(wrapper.classes()).toContain('weather-icon_clear');

    await wrapper.setProps({ type: WeatherType.Clouds });
    expect(wrapper.classes()).toContain('weather-icon_clouds');

    await wrapper.setProps({ type: WeatherType.Thunderstorm });
    expect(wrapper.classes()).toContain('weather-icon_thunder');

    await wrapper.setProps({ type: WeatherType.Tornado });
    expect(wrapper.classes()).toContain('weather-icon_thunder');

    await wrapper.setProps({ type: WeatherType.Drizzle });
    expect(wrapper.classes()).toContain('weather-icon_drizzle');

    await wrapper.setProps({ type: WeatherType.Rain });
    expect(wrapper.classes()).toContain('weather-icon_rain');

    await wrapper.setProps({ type: WeatherType.Snow });
    expect(wrapper.classes()).toContain('weather-icon_snow');

    await wrapper.setProps({ type: WeatherType.Smoke });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: WeatherType.Squall });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: WeatherType.Fog });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: WeatherType.Haze });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: WeatherType.Mist });
    expect(wrapper.classes()).toContain('weather-icon_mist');

    await wrapper.setProps({ type: WeatherType.Dust });
    expect(wrapper.classes()).toContain('weather-icon_dust');

    await wrapper.setProps({ type: WeatherType.Sand });
    expect(wrapper.classes()).toContain('weather-icon_dust');

    await wrapper.setProps({ type: WeatherType.Ash });
    expect(wrapper.classes()).toContain('weather-icon_dust');
  });
});
