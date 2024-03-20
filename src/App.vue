<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";

import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';

const productStore = useProductStore();
const cartStore = useCartStore();

// import { storeToRefs } from 'pinia';
// const { products } = storeToRefs(useProductStore());

productStore.fill();
// this is a typical pattern for vue-powered sites
// you'll have some data in an api, some empty global state in your store
// and on the page where the data is needed, you'll call some action to fill that state

const addToCart = (count, product) => {
  count = parseInt(count)
  for (let index = 0; index < count; index++) {
    cartStore.items.push(product);
  }
}

</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <!-- v-for="product in products" -->
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="addToCart($event, product)"
      />
      <!-- @addToCart="cartStore.items.push(product)" -->
    </ul>
  </div>
</template>
