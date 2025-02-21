import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';

describe('BaseButton', () => {
  const wrapper = mount(BaseButton, {
    props: {
      title: 'test title',
      dataTestId: 'test-button',
    },
    slots: {
      default: '<div>Some content</div>',
    },
  });

  it('should contain title attribute', async () => {
    const wrapperAttrs = wrapper.attributes();

    expect(wrapperAttrs).toHaveProperty('title', 'test title');
  });

  it('should set type attribute', async () => {
    expect(wrapper.html()).toContain('button');

    await wrapper.setProps({ type: 'submit' });

    const wrapperAttrs = wrapper.attributes();

    expect(wrapperAttrs).toHaveProperty('type', 'submit');
  });

  it('should set view', async () => {
    expect(wrapper.html()).toContain('button');

    await wrapper.setProps({ view: 'transparent' });

    expect(wrapper.html()).toContain('button button_view_transparent');
  });

  it('should set text type', async () => {
    expect(wrapper.html()).toContain('button');

    await wrapper.setProps({ text: 'alert' });

    expect(wrapper.html()).toContain('button button_view_transparent button_text_alert');
  });

  it('should contain slot content', async () => {
    expect(wrapper.html()).toContain('Some content');
  });

  it('should contain data-test-id attribute', async () => {
    const wrapperAttrs = wrapper.attributes();

    expect(wrapperAttrs).toHaveProperty('data-test-id', 'test-button');
  });

  it('should emit click event', async () => {
    const button = wrapper.find('button');

    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
