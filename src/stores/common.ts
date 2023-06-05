import { defineStore } from 'pinia';
import { type ICommonState } from '@/types';

export const useCommonStore = defineStore('common', {
  state: (): ICommonState => ({
    status: 'init',
    errorMessage: ''
  }),

  getters: {
    getStatus(): string {
      return this.status;
    },
    getErrorMessage(): string {
      return this.errorMessage;
    }
  },

  actions: {
    setStatus(status: ICommonState['status']) {
      this.status = status;
    },
    setErrorMessage(message: string) {
      this.errorMessage = message;
    }
  }
});
