import { defineStore } from 'pinia';
import type { ICommonState } from '@/types';

export const useCommonStore = defineStore('common', {
  state: (): ICommonState => ({
    status: 'init',
    message: '',
    toastIsVisible: false,
  }),

  actions: {
    setStatus(status: ICommonState['status']) {
      this.status = status;
    },
    setMessage(message: string) {
      this.message = message;
    },
    showToast(timer: number = 5000) {
      if (this.toastIsVisible) {
        return;
      }

      this.toastIsVisible = true;

      setTimeout(() => {
        this.toastIsVisible = false;
        this.status = 'init';
        this.message = '';
      }, timer);
    },
    closeToast() {
      this.toastIsVisible = false;
      this.status = 'init';
      this.message = '';
    },
  },
});
