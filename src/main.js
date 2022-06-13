/*

1. Creating And Using A Store
==========================

-Let' start by creating a counter that is incremented when after clicking a button inside our base container and manage this counter state with Vuex

-We start by creating a vuex Store - stores our application state

-And there is only one store per app

-We do this by importing createStore() from vuex in the main.js and call it and store in a constant store

-createStore({  }) takes an object where we configure our store

-The first property it takes is a method state() which returns your state object

      const store = createStore({
            state(){
                return {
                }
            }
      })

 - Works like data() in a component and holds the application-wise data

 Then we register our store constant like so :

e.g.
       app.use(store)

-And now we can use this state in any component of the entire app

-Continue in App.vue....

*/

import { createApp } from 'vue';

import { createStore } from 'vuex';

import App from './App.vue';

const store = createStore({
    state(){

        return {
            counter : 0,
        }
    }
});

const app = createApp(App);

app.use(store)

app.mount('#app');
