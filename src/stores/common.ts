import { defineStore } from 'pinia';

interface ICommonState {
  status: 'init' | 'loading' | 'updating' | 'success' | 'error';
  errorMessage: string;
}

export const useCommonStore = defineStore<string, ICommonState>('common', {
  state: () => ({
    status: 'init',
    errorMessage: ''
  }),

  getters: {
    getStatus() {
      return this.status;
    },
    getErrorMessage() {
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
