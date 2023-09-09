import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCommonStore } from '@/stores';

describe('common store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const commonStore = useCommonStore();
  const { status, message, toastIsVisible } = storeToRefs(commonStore);
  const { setStatus, setMessage, showToast, closeToast } = commonStore;

  it('correct set status', async () => {
    setStatus('loading');

    expect(status.value).toBe('loading');
  });

  it('correct set message', async () => {
    setMessage('message');

    expect(message.value).toBe('message');
  });

  it('correct set toast visibility', async () => {
    showToast();

    expect(toastIsVisible.value).toBe(true);
  });

  it('correct set close toast', async () => {
    closeToast();

    expect(status.value).toBe('init');
    expect(message.value).toBe('');
    expect(toastIsVisible.value).toBe(false);
  });
});
