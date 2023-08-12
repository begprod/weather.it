import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCardCitySkeleton from '@/components/ui/BaseCardCitySkeleton.vue';

describe('BaseCardCitySkeleton', () => {
  const wrapper = mount(BaseCardCitySkeleton);

  it('correct render', async () => {
    expect(wrapper.html()).toContain(
      'relative flex flex-col w-full h-full p-5 bg-white rounded-[20px] shadow-md overflow-hidden isolate md:p-7 lg:p-10',
    );
    expect(wrapper.html()).toContain('relative z-30');
    expect(wrapper.html()).toContain(
      'w-[60px] h-[60px] bg-gray-300 rounded-[20px] sm:w-[75px] sm:h-[75px]',
    );
    expect(wrapper.html()).toContain(
      'absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50',
    );
    expect(wrapper.html()).toContain(
      'absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center',
    );
  });
});
