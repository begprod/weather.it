import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseGithubCorner from '@/components/ui/BaseGithubCorner/BaseGithubCorner.vue';

describe('BaseGithubCorner', () => {
  const wrapper = mount(BaseGithubCorner, {
    props: {
      url: '/url/',
    },
  });

  it('should contain correct css classes', async () => {
    expect(wrapper.html()).toContain('github-corner');
    expect(wrapper.html()).toContain('octo-arm');
    expect(wrapper.html()).toContain('octo-body');
  });

  it('should set url', async () => {
    expect(wrapper.html()).toContain('/url/');
  });
});
