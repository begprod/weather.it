import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSuggestionsList from '@/components/BaseSuggestionsList/BaseSuggestionsList.vue';

describe('BaseSuggestionsList', () => {
  let wrapper: ComponentWrapperType<typeof BaseSuggestionsList>;

  const createComponent = () => {
    wrapper = mount(BaseSuggestionsList, {
      props: {
        listItems: [
          {
            id: '1',
            name: 'Tokyo',
            country: 'Japan',
            country_code: 'JP',
            lon: 139.6917,
            lat: 35.6895,
            weather: {
              current: 20,
              feels_like: 25,
              air_quality: 1 || null,
              main: 'Clear',
              description: 'clear sky',
            },
          },
          {
            id: '2',
            name: 'Moscow',
            country: 'Russia',
            country_code: 'RU',
            lon: 139.6917,
            lat: 35.6895,
            weather: {
              current: 20,
              feels_like: 25,
              air_quality: 1 || null,
              main: 'Clear',
              description: 'clear sky',
            },
          },
        ],
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

  it('should render list items', async () => {
    await wrapper.setProps({
      isLoading: false,
      isEmpty: false,
    });

    const listItems = wrapper.findAll('[data-test-id="suggestion-item"]');

    expect(listItems.length).toBe(2);
    expect(listItems[0].html()).toContain('Tokyo');
    expect(listItems[1].html()).toContain('Moscow');
  });

  it('should render loader when isLoading is true', async () => {
    await wrapper.setProps({
      isLoading: true,
      isEmpty: false,
    });

    const loader = wrapper.find('[data-test-id="loader"]');
    const emptyMessage = wrapper.find('[data-test-id="empty-message"]');

    expect(loader.exists()).toBe(true);
    expect(emptyMessage.exists()).toBe(false);
  });

  it('should render empty message when isEmpty is true', async () => {
    await wrapper.setProps({
      isLoading: false,
      isEmpty: true,
    });

    const emptyMessage = wrapper.find('[data-test-id="empty-message"]');
    const loader = wrapper.find('[data-test-id="loader"]');

    expect(emptyMessage.exists()).toBe(true);
    expect(loader.exists()).toBe(false);
  });
});
