import { defineStore } from 'pinia';

// import products from '@/data/products.json'

// convention to prefix this export name with the word "use"
// it conforms to same convention used be vue composables
export const useProductStore = defineStore('ProductStore', {

  // state must be defined as a function that returns the initial state
  // this allows pinia to work in both server and client side environments
  state: () => {
    return {
      // products,

      // in a real life app, your data would come from an API
      // so products would be empty to begin with, and you'd fill
      // it from some kind of action
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