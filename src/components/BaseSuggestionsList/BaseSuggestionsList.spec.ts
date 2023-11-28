import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdLocationoffTwotone, RiLoaderLine } from 'oh-vue-icons/icons';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSuggestionsList from '@/components/BaseSuggestionsList/BaseSuggestionsList.vue';

addIcons(MdLocationoffTwotone, RiLoaderLine);

describe('BaseSuggestionsList', () => {
  const wrapper = mount(BaseSuggestionsList, {
    props: {
      isItemsListVisible: false,
      isLoading: false,
      isEmpty: false,
    },
    global: {
      components: {
        'v-icon': OhVueIcon,
      },
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
    expect(wrapper.html()).toContain('ov-icon');
  });

  it('should show empty message', async () => {
    await wrapper.setProps({
      isItemsListVisible: false,
      isLoading: false,
      isEmpty: true,
    });

    expect(wrapper.html()).toContain('City not found');
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
