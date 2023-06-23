import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault.vue';
import { version } from '../../../../package.json';

describe('BaseFooterDefault', () => {
  it('correct app version', async () => {
    const wrapper = mount(BaseFooterDefault, {
      props: {
        version: `v${version}`,
      },
    });

    expect(wrapper.html()).toContain(`v${version}`);
  });
});
