import { defineStore } from 'pinia';
import type { ICommonState } from '@/types';

export const useCommonStore = defineStore('common', {
  state: (): ICommonState => ({
    status: 'init',
    message: '',
    toastIsVisible: false,
    currentToastTimerId: 0,
  }),

  actions: {
    setStatus(status: ICommonState['status']) {
      this.status = status;
    },
    setMessage(message: string) {
      this.message = message;
    },
    showToast() {
      let timeLeft: number = 5;

      const updateTimer = () => {
        clearTimeout(this.currentToastTimerId);
        timeLeft = 5;

        this.currentToastTimerId = window.setInterval(() => {
          timeLeft -= 1;

          if (timeLeft <= 0) {
            clearTimeout(this.currentToastTimerId);
            this.closeToast();
          }
        }, 1000);
      };

      if (this.toastIsVisible) {
        updateTimer();
      }

      this.toastIsVisible = true;

      updateTimer();
    },
    closeToast() {
      clearTimeout(this.currentToastTimerId);

      this.toastIsVisible = false;
      this.status = 'init';
      this.message = '';
    },
  },
});
