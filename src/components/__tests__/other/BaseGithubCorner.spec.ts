import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseGithubCorner from '@/components/other/BaseGithubCorner.vue';

describe('BaseGithubCorner', () => {
  it('correct render', async () => {
    const wrapper = mount(BaseGithubCorner, {
      props: {
        url: '/url/',
      },
    });

    expect(wrapper.html()).toContain('github-corner');
    expect(wrapper.html()).toContain('octo-arm');
    expect(wrapper.html()).toContain('octo-body');
  });

  it('correct props', async () => {
    const wrapper = mount(BaseGithubCorner, {
      props: {
        url: '/url/',
      },
    });

    expect(wrapper.html()).toContain('/url/');
  });
});
