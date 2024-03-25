import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore('AuthUserStore', {
  state: () => {
    return {
      username: 'andyrothwell',
    }
  },

  // getters: {
  //   username: () => 'andyrothwell',
  // },

  actions: {
    visitTwitterProfile() {
      window.open('https://twitter.com/wawaman', '_blank');
    },
  },
});