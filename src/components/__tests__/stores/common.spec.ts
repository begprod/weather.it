import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCommonStore } from '@/stores';

describe('common store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const commonStore = useCommonStore();

  it('correct set status', async () => {
    commonStore.setStatus('loading');

    expect(commonStore.getStatus).toBe('loading');
  });

  it('correct set message', async () => {
    commonStore.setMessage('message');

    expect(commonStore.getMessage).toBe('message');
  });

  it('correct set toast visibility', async () => {
    commonStore.showToast();

    expect(commonStore.getToastVisibility).toBe(true);
  });

  it('correct set close toast', async () => {
    commonStore.closeToast();

    expect(commonStore.getStatus).toBe('init');
    expect(commonStore.getMessage).toBe('');
    expect(commonStore.getToastVisibility).toBe(false);
  });
});
