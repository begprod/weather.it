import { defineStore } from 'pinia';
import { type ICommonState } from '@/types';

export const useCommonStore = defineStore('common', {
  state: (): ICommonState => ({
    status: 'init',
    message: '',
    toastVisibility: false
  }),

  getters: {
    getStatus(): string {
      return this.status;
    },
    getMessage(): string {
      return this.message;
    },
    getToastVisibility(): boolean {
      return this.toastVisibility;
    }
  },

  actions: {
    setStatus(status: ICommonState['status']) {
      this.status = status;
    },
    setMessage(message: string) {
      this.message = message;
    },
    showToast(timer: number = 5000) {
      if (this.toastVisibility) {
        return;
      }

      this.toastVisibility = true;

      setTimeout(() => {
        this.toastVisibility = false;
        this.status = 'init';
        this.message = '';
      }, timer);
    },
    closeToast() {
      this.toastVisibility = false;
      this.status = 'init';
      this.message = '';
    }
  }
});
