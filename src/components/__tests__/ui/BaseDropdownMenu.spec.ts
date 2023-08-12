import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { HiDotsVertical } from 'oh-vue-icons/icons';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { clickOutside } from '@/directives/clickOutsideDirective';
import BaseDropdownMenu from '@/components/ui/BaseDropdownMenu.vue';

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

  it('correct render slot when menu is closed', async () => {
    expect(wrapper.html()).not.toContain('Some content');
  });

  it('correct render slot when menu is open', async () => {
    await wrapper.setProps({ isMenuOpen: true });

    expect(wrapper.html()).toContain('Some content');
  });

  it('correct emit toggle event on click', async () => {
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('toggleMenu');
  });

  it('correct emit close event on directive click outside', async () => {
    await wrapper.setProps({ isMenuOpen: true });

    document.body.click();

    expect(wrapper.emitted()).toHaveProperty('closeMenu');
  });
});
