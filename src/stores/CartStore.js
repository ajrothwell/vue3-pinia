import { defineStore, acceptHMRUpdate } from 'pinia';

import { groupBy } from 'lodash'; // lodash is a utility library that provides a lot of helper functions

import { useAuthUserStore } from '@/stores/AuthUserStore';

export const useCartStore = defineStore('CartStore', {
  historyEnabled: true,
  state: () => {
    return {
      items: [],
    };
  },

  // a getter is synonymous with a computed prop in a component
  // it's purpose is to return a computed value based on the state of the store
  getters: {
    // count() {
    //   return this.items.length;
    // },

    // Pinia knows that a lot of us like to use arrow functions
    // so in order to make this work it provides the state as the
    // first argument to the getter function
    // use it in place of the "this" keyword
    count: (state) => state.items.length,

    // isEmpty() {
    //   // we can use getters inside of other getters
    //   return this.count === 0;
    // }

    isEmpty: (state) => state.count === 0,

    // grouped: (state) => groupBy(state.items, item => item.name),
    grouped: (state) => {
      const grouped = groupBy(state.items, item => item.name);
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach(key => inOrder[key] = grouped[key]);
      return inOrder;
    },
    
    // dynamic getters - returning a function from a getter instead
    // of returning a value
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
  },

  actions: {
    checkout() {
      const authUserStore = useAuthUserStore();
      alert (`${authUserStore.username} just bought ${this.count} items for a total of $${this.total}`);
    },
    addItems(count, item) {
      // throw new Error('example error');
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    clearItem(itemName) {
      this.items = this.items.filter(i => i.name !== itemName);
    },
    setItemCount(item, count) {
      console.log('item:', item, 'item.name:', item.name, 'count:', count);
      this.clearItem(item.name);
      this.addItems(count, item);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}