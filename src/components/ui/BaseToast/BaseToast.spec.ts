import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { HandThumbUpIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';

describe('BaseToast', () => {
  const wrapper = mount(BaseToast, {
    props: {
      message: 'message',
      isVisible: false,
    },
    global: {
      components: {
        HandThumbUpIcon,
        ExclamationTriangleIcon,
      },
    },
  });

  it('should contain correct css classes', async () => {
    expect(wrapper.html()).toContain('fixed bottom-6 left-1/2 -translate-x-1/2 w-[272px] z-50');
  });

  it('should contain success toast type css classes', async () => {
    await wrapper.setProps({
      type: 'success',
      message: 'Success message',
      isVisible: true,
    });

    expect(wrapper.html()).toContain('svg');
    expect(wrapper.html()).toContain('text-green-500');
    expect(wrapper.html()).toContain('Success message');
    expect(wrapper.findComponent(HandThumbUpIcon).exists()).toBe(true);
  });

  it('should contain error toast type css classes', async () => {
    await wrapper.setProps({
      type: 'error',
      message: 'Error message',
      isVisible: true,
    });

    expect(wrapper.html()).toContain('svg');
    expect(wrapper.html()).toContain('text-red-500');
    expect(wrapper.html()).toContain('Error message');
    expect(wrapper.findComponent(ExclamationTriangleIcon).exists()).toBe(true);
  });

  it('should contain default toast type css classes', async () => {
    await wrapper.setProps({
      type: 'default',
      message: 'Default message',
      isVisible: true,
    });

    expect(wrapper.html()).toContain('text-gray-500');
    expect(wrapper.html()).toContain('Default message');
  });

  it('should emit click event', async () => {
    const toast = wrapper.find('.flex.w-full');

    await toast.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
