import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseWeatherIcon from '@/components/ui/BaseWeatherIcon/BaseWeatherIcon.vue';

describe('BaseWeatherIcon', () => {
  let wrapper: ComponentWrapperType<typeof BaseWeatherIcon>;

  const createComponent = () => {
    wrapper = mount(BaseWeatherIcon, {
      props: {
        type: 'Clear',
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  // const wrapper = mount(BaseWeatherIcon, {
  //   props: {
  //     type: 'clear',
  //   },
  // });

  it('should contain icons css classes', async () => {
    await wrapper.setProps({ type: 'Clear' });
    expect(wrapper.classes()).toContain('weather-icon_clear');

    await wrapper.setProps({ type: 'Clouds' });
    expect(wrapper.classes()).toContain('weather-icon_clouds');

    await wrapper.setProps({ type: 'Thunderstorm' });
    expect(wrapper.classes()).toContain('weather-icon_thunder');

    await wrapper.setProps({ type: 'Tornado' });
    expect(wrapper.classes()).toContain('weather-icon_thunder');

    await wrapper.setProps({ type: 'Drizzle' });
    expect(wrapper.classes()).toContain('weather-icon_drizzle');

    await wrapper.setProps({ type: 'Rain' });
    expect(wrapper.classes()).toContain('weather-icon_rain');

    await wrapper.setProps({ type: 'Snow' });
    expect(wrapper.classes()).toContain('weather-icon_snow');

    await wrapper.setProps({ type: 'Smoke' });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: 'Squall' });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: 'Fog' });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: 'Haze' });
    expect(wrapper.classes()).toContain('weather-icon_smoke');

    await wrapper.setProps({ type: 'Mist' });
    expect(wrapper.classes()).toContain('weather-icon_mist');

    await wrapper.setProps({ type: 'Dust' });
    expect(wrapper.classes()).toContain('weather-icon_dust');

    await wrapper.setProps({ type: 'Sand' });
    expect(wrapper.classes()).toContain('weather-icon_dust');

    await wrapper.setProps({ type: 'Ash' });
    expect(wrapper.classes()).toContain('weather-icon_dust');
  });
});
