import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSuggestionsList from '@/components/BaseSuggestionsList/BaseSuggestionsList.vue';

describe('BaseSuggestionsList', () => {
  let wrapper: ComponentWrapperType<typeof BaseSuggestionsList>;

  const createComponent = () => {
    wrapper = mount(BaseSuggestionsList, {
      props: {
        isItemsListVisible: false,
        isLoading: false,
        isEmpty: false,
      },
      slots: {
        default: '<div>Some content</div>',
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render slot content', async () => {
    await wrapper.setProps({
      isItemsListVisible: true,
      isLoading: false,
      isEmpty: false,
    });

    const itemsListSlot = wrapper.find('[data-test-id="items-list-slot"]');

    expect(itemsListSlot.exists()).toBe(true);
    expect(itemsListSlot.text()).toBe('Some content');
  });

  it('should show loader when isLoading is true', async () => {
    await wrapper.setProps({
      isItemsListVisible: false,
      isLoading: true,
      isEmpty: false,
    });

    const loader = wrapper.find('[data-test-id="loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should show empty message when isEmpty is true', async () => {
    await wrapper.setProps({
      isItemsListVisible: false,
      isLoading: false,
      isEmpty: true,
    });

    const emptyMessage = wrapper.find('[data-test-id="empty-message"]');

    expect(emptyMessage.exists()).toBe(true);
  });
});
