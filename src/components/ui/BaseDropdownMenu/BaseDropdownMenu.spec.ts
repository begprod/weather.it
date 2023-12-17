import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { HiDotsVertical } from 'oh-vue-icons/icons';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue';
import BaseDropdownMenu from '@/components/ui/BaseDropdownMenu/BaseDropdownMenu.vue';

addIcons(HiDotsVertical);

describe('BaseDropdownMenu', () => {
  const wrapper = mount(BaseDropdownMenu, {
    props: {
      isMenuOpen: false,
    },
    global: {
      directives: {
        'click-outside': clickOutside,
      },
      components: {
        'v-icon': OhVueIcon,
      },
    },
    slots: {
      default: '<div>Some content</div>',
    },
  });

  it('should contain BaseButton component', async () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('should not render slot when menu is closed', async () => {
    expect(wrapper.html()).not.toContain('Some content');
  });

  it('should render slot when menu is open', async () => {
    await wrapper.setProps({ isMenuOpen: true });

    expect(wrapper.html()).toContain('Some content');
  });

  it('should emit toggle event on click', async () => {
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('toggleMenu');
  });

  it('should emit close event on outside click directive', async () => {
    await wrapper.setProps({ isMenuOpen: true });

    document.body.click();

    expect(wrapper.emitted()).toHaveProperty('closeMenu');
  });

  it('should emit escape event on escape keydown', async () => {
    await wrapper.setProps({ isMenuOpen: true });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(wrapper.emitted()).toHaveProperty('closeMenu');
  });
});
