import { defineStore } from 'pinia';

// import products from '@/data/products.json'

export const useProductStore = defineStore('ProductStore', {
  state: () => {
    return {
      // products,
      products:[]
    };
  },

  actions: {
    // actions in your store are synonymous
    // with methods for your component
    // except that they are meant to mutate
    // your store's data instead of a component's
    // local data

    // I want to set the products in our state to the products from the json file
    // fill() {
    //   this.products = products;
    // },
    async fill() {
      this.products = (await import('@/data/products.json')).default;
      // here we are using a dynamic import instead of something like fetch or axios
      // this.products = (await axios.get('some/end/point')).data
    },
  },

  //getters
})