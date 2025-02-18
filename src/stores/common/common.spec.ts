import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCommonStore } from '@/stores';

describe('common store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const commonStore = useCommonStore();
  const { status, message, isToastVisible } = storeToRefs(commonStore);
  const { setStatus, setMessage, showToast, closeToast } = commonStore;

  it('should set status', async () => {
    setStatus('loading');

    expect(status.value).toBe('loading');
  });

  it('should set message', async () => {
    setMessage('message');

    expect(message.value).toBe('message');
  });

  it('should set toast visibility true', async () => {
    showToast();

    expect(isToastVisible.value).toBe(true);
  });

  it('should set toast visibility false', async () => {
    closeToast();

    expect(status.value).toBe('init');
    expect(message.value).toBe('');
    expect(isToastVisible.value).toBe(false);
  });
});
