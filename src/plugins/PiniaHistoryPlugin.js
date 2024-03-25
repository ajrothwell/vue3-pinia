// all a pinia plugin really is is a function that gets called
// on the definition of each pinia store

// all pinia plugins when registered receive a context object
// that is made up of several useful pieces of data

// pinia - the pinia instance created with the createPinia function
// in main.js

// app - the vue app, created with the createApp function in main.js

// store - the current store the plugin is augmenting
// this plugin function will be called once on the definition of each store in our application
// so store for us would be:
// AuthUserStore
// CartStore
// ProductStore

// options - the state, the getters, the actions, and any other custom options

import { ref, reactive } from 'vue';

export function PiniaHistoryPlugin({ pinia, app, store, options }) {

  if (!options.historyEnabled) return;

  const history = reactive([]);

  const future = reactive([]);
  
  const doingHistory = ref(false);
  
  history.push(JSON.stringify(store.$state));
  
  store.$subscribe((mutation, state) => {
    console.log('doingHistory.value:', doingHistory.value, 'mutation:', mutation, 'state:', state);
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  });

  return {
    history,
    future,
    undo: () => {
      console.log('undo running');
      if (history.length === 1) return;
      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      doingHistory.value = false;
    },
    redo: () => {
      const latestState = future.pop();
      if (!latestState) return;
      doingHistory.value = true;
      history.push(latestState);
      store.$state = JSON.parse(latestState);
      doingHistory.value = false;
    }
  }

}