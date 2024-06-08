import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseGithubCorner from '@/components/ui/BaseGithubCorner/BaseGithubCorner.vue';

describe('BaseGithubCorner', () => {
  const wrapper = mount(BaseGithubCorner, {
    props: {
      url: '/url/',
    },
  });

  it('should contain correct elements', async () => {
    const githubCorner = wrapper.find('[data-test-id="github-corner"]');
    const octoArm = wrapper.find('[data-test-id="octo-arm"]');
    const octoBody = wrapper.find('[data-test-id="octo-body"]');

    expect(githubCorner.exists()).toBe(true);
    expect(octoArm.exists()).toBe(true);
    expect(octoBody.exists()).toBe(true);
  });

  it('should contain url from props', async () => {
    expect(wrapper.html()).toContain('/url/');
  });
});
