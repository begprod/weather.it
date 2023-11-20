import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';

describe('BaseButton', () => {
  const wrapper = mount(BaseButton, {
    props: {
      title: 'test title',
    },
    slots: {
      default: '<div>Some content</div>',
    },
  });

  it('should set title', async () => {
    expect(wrapper.html()).toContain('test title');
  });

  it('should set type props', async () => {
    expect(wrapper.html()).toContain('button');

    await wrapper.setProps({ type: 'submit' });

    expect(wrapper.html()).toContain('submit');
  });

  it('should set view props', async () => {
    expect(wrapper.html()).toContain(
      'bg-white border rounded-full p-3 md:p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300',
    );

    await wrapper.setProps({ view: 'transparent' });

    expect(wrapper.html()).toContain('bg-transparent border-none');
  });

  it('should set slot', async () => {
    expect(wrapper.html()).toContain('Some content');
  });

  it('should emit click event', async () => {
    const button = wrapper.find('button');

    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
