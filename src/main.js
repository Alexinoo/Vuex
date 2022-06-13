/*N/B: WHY Vuex
====================

> Outsourced State Management

> Predictable State Management flow

> Clearly defined data flow




// ==========================================================



2. Creating And Using A Store
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

==================================================================


4. Introducing Mutations  - A better way of changing
=====================================

-Please note that the way we are using Vuex works but it is not following the vuex philosophy

-We are directly tapping to ur $store.state.counter to change something from inside TheCounter/ChangeCounter component

-And while this works technically here , it is not ideal

-We can easily introduce bug / errors  if we manipulate the state object inside our components and change the state anywhere

-Every time we want to update the state object , we have to do it in more than one place and we can easily make mistakes

-And in bigger applications , we might even have it in more places where we need to change the logic which is a lot of code duplication

_Vuex mutations
--------------------------

-We have APP-WIDE , CENTRAL DATA STORE / STATE STORE that we communicate with from inside our components - Yes we want to communicate but not directly

-Instead Vuex has a built-in concept called mutations

-mutations are clearly defined methods to update the state

-And from inside our components , we should in the end just trigger those mutations instead of directly manipulating state

-By triggering mutations , all components that want to edit it do it in the same way and it is guaranteed that they will do it the same way

-mutations takes in an object and you can define methods inside this objects that contains logic to change the state

-It takes the current state as an argument - Vuex will give us that state whenever it is triggered

-And now we can access the state object property using the argument provided by Vue 

     increment( state ) {
            state.counter = state.counter + 1
        }

-So if we wanna change our logic , we can simply do it in our central place;

-And now we want to trigger this mutation from all the places that should change our state

-So in our <ChangeCounter /> ,  and App.vue , to trigger a mutation we access this.$store and call the commit() method

-commit() is a built-in method which vuex gives us on it's store and it takes the name of the mutation you want to perform

-name shd be provided as a string
        e.g.
            this.$store.commit('increment')

AND NOW WE HAVE MOVED THE CONCRETE LOGIC OF HOW THIS STATE IS UPDATED OUT OF THE COMPONENTS INTO OUR STORE .I.E INTO THE MUTATION

-AND WE JUST COMMIT THIS MUTATION INSIDE OUR COMPONENT

*/

import { createApp } from 'vue';

import { createStore } from 'vuex';

import App from './App.vue';

const store = createStore({
    state(){

        return {
            counter : 0,
        }
    } ,

    mutations : {
        increment( state ) {
            state.counter = state.counter + 1
        }
    }
});

const app = createApp(App);

app.use(store)

app.mount('#app');
