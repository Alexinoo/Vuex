<!-- 2. Connecting Components to State
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

 -->


<template>
  <base-container title="Vuex">
    <the-counter></the-counter>
    <button @click="addOne">Add 1</button>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter.vue'

export default {
  components: {
    BaseContainer,
    TheCounter
  },
  methods : {
    addOne(){
      this.$store.state.counter++
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