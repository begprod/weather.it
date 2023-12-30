import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { ArrowPathIcon, SignalSlashIcon } from '@heroicons/vue/24/solid';
import BaseSuggestionsList from '@/components/BaseSuggestionsList/BaseSuggestionsList.vue';

describe('BaseSuggestionsList', () => {
  const wrapper = mount(BaseSuggestionsList, {
    props: {
      isItemsListVisible: false,
      isLoading: false,
      isEmpty: false,
    },
    slots: {
      default: '<div>Some content</div>',
    },
  });

  it('should be visible when isItemVisible is true', async () => {
    await wrapper.setProps({
      isItemsListVisible: true,
      isLoading: false,
      isEmpty: false,
    });

    expect(wrapper.html()).toContain(
      'absolute left-0 top-full w-full min-h-[48px] bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-y-auto',
    );
  });

  it('should be visible when isLoading is true', async () => {
    await wrapper.setProps({
      isItemsListVisible: false,
      isLoading: true,
      isEmpty: false,
    });

    expect(wrapper.html()).toContain(
      'absolute left-0 top-full w-full min-h-[48px] bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-y-auto',
    );
  });

  it('should be visible when isEmpty is true', async () => {
    await wrapper.setProps({
      isItemsListVisible: false,
      isLoading: false,
      isEmpty: true,
    });

    expect(wrapper.html()).toContain(
      'absolute left-0 top-full w-full min-h-[48px] bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-y-auto',
    );
  });

  it('should show loader', async () => {
    await wrapper.setProps({
      isItemsListVisible: false,
      isLoading: true,
      isEmpty: false,
    });

    expect(wrapper.html()).toContain('animate-spin');
    expect(wrapper.html()).toContain('svg');
    expect(wrapper.findComponent(ArrowPathIcon).exists()).toBe(true);
  });

  it('should show empty message', async () => {
    await wrapper.setProps({
      isItemsListVisible: false,
      isLoading: false,
      isEmpty: true,
    });

    expect(wrapper.html()).toContain('City not found');
    expect(wrapper.findComponent(SignalSlashIcon).exists()).toBe(true);
  });

  it('should render slot', async () => {
    await wrapper.setProps({
      isItemsListVisible: true,
      isLoading: false,
      isEmpty: false,
    });

    expect(wrapper.html()).toContain('Some content');
  });
});
