import { version } from '../../../../../package.json';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseFooterDefault from '@/components/layouts/partials/BaseFooterDefault/BaseFooterDefault.vue';

describe('BaseFooterDefault', () => {
  const wrapper = mount(BaseFooterDefault, {
    props: {
      version: `v${version}`,
    },
  });

  it('should render app version', async () => {
    const appVersionEl = wrapper.find('[data-test-id="app-version"]');

    expect(appVersionEl.html()).toContain(`v${version}`);
  });
});
