<!-- 3. Connecting Components to State
================================

-Then we use $store.state.counter to access the value of our counter

   > $store - points at the Vuex store ; 
    
   > .state - Has a state property which points at the state object managed by the store 

   > property - Actual property value

-Then we can add a click event to Add 1 button which fires addOne() and we can add it logic in the methods : {}

    e.g <button @click="addOne">Add 1</button>

-We can also store $store.state.counter in a computed property and then replace it with the name of the method 

      <h3>{{ counter }}</h3>

      computed : {

        counter(){
          return $store.state.counter
        }
      }
-We can also split the counter into a standalone component <TheCounter /> and access our state object return $store.state.counter in that component

-Then call import / register and use it in App. vue as 

    e.g.   <the-counter></the-counter>



    10. ) EXAMPLE ADDING MORE STATE
==================================

-Imported <UserAuth /> component and register it locally

-Used it inside <base-container></base-container>  and give it a title of Auth

-Use computed property that returns isLoggedIn state using the getter;

      computed: {

        isAuth() {
          return this.$store.getters.userIsAuthenticated;
        }
      },

  -Check if isAuth is true/false and show Vuex Container

 -->


<template>
  <base-container title="Vuex" v-if="isAuth">
    <the-counter></the-counter>

    <favorite-value></favorite-value>

    <button @click="addTen">Add 10</button>
    <change-counter></change-counter>    
  </base-container>

  <base-container title="Auth">
  <user-auth></user-auth>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter.vue'
import ChangeCounter from './components/ChangeCounter.vue';

import FavoriteValue from './components/FavoriteValue.vue'
import UserAuth from './components/UserAuth.vue';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavoriteValue,
    UserAuth,
  },

  computed: {

    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    }
  },

  methods : {
    
    addTen(){
        //ALTERNATIVE 1 :  this.$store.commit('increase' , { value : 10 })

        //ALTERNATIVE 2 :  this.$store.dispatch('increase' , { value : 10 })

        /*ALTERNATIVE 3 :  - USING namespaced modules

              this.$store.dispatch({
                type : 'numbers/increase' , 
                value : 10 ,
                })
         */

      this.$store.dispatch({
             type: 'numbers/increase' ,
             value : 10
        });
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>