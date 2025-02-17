import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton/BaseCardCitySkeleton.vue';

describe('BaseCardCitySkeleton', () => {
  const wrapper = mount(BaseCardCitySkeleton);

  it('should contain correct css classes', async () => {
    expect(wrapper.html()).toContain('skeleton-card__inner');
    expect(wrapper.html()).toContain('skeleton-card__column animate-pulse');
    expect(wrapper.html()).toContain('skeleton-card__line skeleton-card__line_md');
    expect(wrapper.html()).toContain('skeleton-card__line skeleton-card__line_sm');
    expect(wrapper.html()).toContain('skeleton-card__line_square');
  });
});
