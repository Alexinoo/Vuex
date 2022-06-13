<!--

-Then we use $store.state.counter to access the value of our counter

   > $store - points at the Vuex store ; 
    
   > .state - Has a state property which points at the state object managed by the store 

   > property - Actual property value

 -->


<template>
  <base-container title="Vuex">
    <h3>{{ $store.state.counter }}</h3>
    <button @click="addOne">Add 1</button>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';

export default {
  components: {
    BaseContainer,
  },
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