import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseLayoutDefault from '@/components/layouts/BaseLayoutDefault/BaseLayoutDefault.vue';

describe('BaseFooterDefault', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('correct render', async () => {
    const wrapper = mount(BaseLayoutDefault, {
      global: {
        components: {
          'v-icon': {},
        },
      },
    });

    expect(wrapper.html()).toContain('font-body overflow-hidden');
    expect(wrapper.html()).toContain('footer');
    expect(wrapper.html()).toContain('github-corner');
  });
});
