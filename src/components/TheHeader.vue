<script>
// imports
import { useAuthUserStore } from '@/stores/AuthUserStore';

import { mapState, mapWritableState, mapActions } from 'pinia';

import CartWidget from './CartWidget.vue';

export default {
  components: {
    CartWidget,
  },
  computed: {
    // ...mapState(useAuthUserStore, ['username']),
    // ...mapState(useAuthUserStore, {
    //   user: "username",
    //   // user: store => `Hello ${store.username}`,
    // }),
    ...mapWritableState(useAuthUserStore, {
      user: "username",
      // this function doesn't work with mapWritableState
      // user: store => `Hello ${store.username}`,
    }),
  },
  methods: {
    // ...mapActions(useAuthUserStore, ['visitTwitterProfile']),
    ...mapActions(useAuthUserStore, {
      toTwitter: 'visitTwitterProfile'
    }),
  },
};

</script>

<template>
  <header 
    class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <!-- <span class="mr-5">{{ username }}</span> -->
      <input v-model="user" type="text" />
      <!-- <span class="mr-5" @click="visitTwitterProfile">{{ user }}</span> -->
      <span class="mr-5" @click="toTwitter">{{ user }}</span>
      <CartWidget class="inline-block" />
    </div>
  </header>
</template>