import { defineStore } from 'pinia';
// import { type ICommonState } from '@/types';

export const useCommonStore = defineStore('common', {
  state: () => ({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  }),

  getters: {
    getIsLoading(): boolean {
      return this.isLoading;
    },
    getIsSuccess(): boolean {
      return this.isSuccess;
    },
    getIsError(): boolean {
      return this.isError;
    },
    getErrorMessage(): string {
      return this.errorMessage;
    }
  },

  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value;
    },
    setIsSuccess(value: boolean) {
      this.isSuccess = value;
    },
    setIsError(value: boolean) {
      this.isError = value;
    },
    setErrorMessage(message: string) {
      this.errorMessage = message;
    }
  }
});
