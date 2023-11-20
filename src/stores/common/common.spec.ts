import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCommonStore } from '@/stores';

describe('common store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const commonStore = useCommonStore();
  const { status, message, toastIsVisible } = storeToRefs(commonStore);
  const { setStatus, setMessage, showToast, closeToast } = commonStore;

  it('should set status', async () => {
    setStatus('loading');

    expect(status.value).toBe('loading');
  });

  it('should set message', async () => {
    setMessage('message');

    expect(message.value).toBe('message');
  });

  it('should set toast visibility', async () => {
    showToast();

    expect(toastIsVisible.value).toBe(true);
  });

  it('should set close toast', async () => {
    closeToast();

    expect(status.value).toBe('init');
    expect(message.value).toBe('');
    expect(toastIsVisible.value).toBe(false);
  });
});
