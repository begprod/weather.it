import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdDoneallOutlined, MdNotinterestedOutlined } from 'oh-vue-icons/icons';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseToast from '@/components/ui/BaseToast.vue';

addIcons(MdDoneallOutlined, MdNotinterestedOutlined);

describe('BaseToast', () => {
  const wrapper = mount(BaseToast, {
    props: {
      message: 'message',
      isVisible: false,
      clickHandler: vi.fn(),
    },
    global: {
      components: {
        'v-icon': OhVueIcon,
      },
    },
  });

  it('correct render', async () => {
    expect(wrapper.html()).toContain('fixed bottom-6 left-1/2 -translate-x-1/2 w-[272px] z-50');
  });

  it('correct render success toast type', async () => {
    await wrapper.setProps({
      type: 'success',
      message: 'Success message',
      isVisible: true,
    });

    expect(wrapper.html()).toContain('svg');
    expect(wrapper.html()).toContain('text-green-500');
    expect(wrapper.html()).toContain('Success message');
  });

  it('correct render error toast type', async () => {
    await wrapper.setProps({
      type: 'error',
      message: 'Error message',
      isVisible: true,
    });

    expect(wrapper.html()).toContain('svg');
    expect(wrapper.html()).toContain('text-red-500');
    expect(wrapper.html()).toContain('Error message');
  });

  it('correct render default toast type', async () => {
    await wrapper.setProps({
      type: 'default',
      message: 'Default message',
      isVisible: true,
    });

    expect(wrapper.html()).toContain('text-gray-500');
    expect(wrapper.html()).toContain('Default message');
  });

  it('correct render click handler', async () => {
    const clickHandler = vi.fn();

    await wrapper.setProps({
      type: 'success',
      message: 'Success message',
      isVisible: true,
      clickHandler,
    });

    const element = wrapper.find('.flex');

    await element.trigger('click');

    expect(clickHandler).toHaveBeenCalled();
  });
});
