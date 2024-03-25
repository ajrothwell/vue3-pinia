<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";

import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';

// import { ref, reactive } from 'vue';

const productStore = useProductStore();
const cartStore = useCartStore();

// const history = reactive([]);

// const future = reactive([]);

// const doingHistory = ref(false);

// history.push(JSON.stringify(cartStore.$state));

// const redo = () => {
//   const latestState = future.pop();
//   if (!latestState) return;
//   doingHistory.value = true;
//   history.push(latestState);
//   cartStore.$state = JSON.parse(latestState);
//   doingHistory.value = false;
// }

// const undo = () => {
//   console.log('undo running');
//   if (history.length === 1) return;
//   doingHistory.value = true;
//   future.push(history.pop());
//   cartStore.$state = JSON.parse(history.at(-1));
//   doingHistory.value = false;
// }

// cartStore.$subscribe((mutation, state) => {
//   console.log('doingHistory.value:', doingHistory.value, 'mutation:', mutation, 'state:', state);
//   if (!doingHistory.value) {
//     history.push(JSON.stringify(state));
//     future.splice(0, future.length);
//   }
// });

cartStore.$onAction(({
  name,
  store,
  args, // an array of the parameters passed to the action (count, product)
  after,
  onError
}) => {
  if (name === 'addItems') {
    after(() => {
      console.log('args[0]', args[0]);
    });
    onError((error) => {
      console.log('hello error:', error.message);
    });
  }
});

// import { storeToRefs } from 'pinia';
// const { products } = storeToRefs(useProductStore());

productStore.fill();
// this is a typical pattern for vue-powered sites
// you'll have some data in an api, some empty global state in your store
// and on the page where the data is needed, you'll call some action to fill that state

// const addToCart = (count, product) => {
//   count = parseInt(count)

//   // to group the mutations into a single one, use $patch
//   cartStore.$patch(state => {
//     for (let index = 0; index < count; index++) {
//       state.items.push(product);
//     }
//   })
//   // for (let index = 0; index < count; index++) {
//   //   cartStore.items.push(product);
//   // }
// }

</script>

<template>
  <div class="container">
    <TheHeader />

    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>

    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <!-- v-for="product in products" -->
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart = "cartStore.addItems($event, product)"
      />
      
      <!-- @addToCart="addToCart($event, product)" -->
      <!-- using the special $event keyword to get the count
      emitted from the component, and then passing the
      product as the second argument -->

      <!-- @addToCart="cartStore.items.push(product)" -->
    </ul>
  </div>
</template>
