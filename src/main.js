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



5. Passing Data to Mutations with payloads
=====================================

-Now some mutations might require arguments like we are hardcoding here
  increment( state ) {
            state.counter = state.counter + 2
        }

-We could add an increase(state) mutation which also gets the state 

-And say that in here we also want to change the counter by increasing it with a value which can be defined when this mutation is commited

-And to also allow for this scenario , your mutations actually take a second argument (   i.e A payload / data-package ) that can be appended

-Now payload can be anything i.e Number / String / Object

-And here we can assume that it is an object where we have a value property but you can also expects any data on commited mutations

-But How can we now call this mutation increase() from our component  ..?  
------------------------------------

-The commit() also takes in a second argument - which will be the payload which later will be received in your mutation

-Could be a Number / String / But in our case we are expecting an object which we are accessing with payload.value in our mutation

.e.g.     this.$store.commit('increase' , { value : 10 })

-So payloads - extra data can be passed to your mutations

-We also have an alternative of commiting  by passing it an object with the following properties:
        {
                type - Holds the name of the mutation

                value - 10
            }
-And this object will be provided as payload to the specified mutation

 e.g.  this.$store.commit({
                type : 'increase' ,
                value : 10
        });


        
6. Introducing Getters - A Better way of Getting Data
=====================================

- We use mutations to edit our data in the store , we could also argue directly reading the values from the state is not ideal

- Why could this be sub-optimal ..?

-Let's add <FavoriteValue /> component with the same logic as <TheCOunter />

-And now let's say we want to update the counter by multiplying by 2

-So that means we do it in 2 locations and that leads to duplication and certainly needs to change this in diff places if we want to work with another value

-This might not be ideal with big applications  and that is why we dont want to directly talk to the state

-We can use a concept called Getters which are computed properies which are directly defined in the store which we can use inside any of our components 

-getters is a property which takes in object with a variety of methods defined

-It also takes state 0- which is the current state value and other getters as the second argument

-Passing getters here is useful if the value that we are expecting here depends on the result of another getter

-A getter has to return a value which is ideally our counter managed by the state multiplied by 2

e.g. 

    finalCounter(state){
            
            console.log(state);
             return state.counter * 2;
        }
-And now we can access our finalCounter getter inside <TheCounter /> by using

        this.$store.getters.finalCounter

-And we don't call it / execute it ; We just point at it

-And now we can replace reading directly
             this.$store.state.counter * 2
  with( use of getters )
             this.$store.getters.finalCounter instead

-So if we ever want to have the value of the counter to something else , we can do it in one place

-We can also have normalizeCounter(state) that multiplies the current counter by 3

-It shd then check if the counter is greater than 100 return 100 and if less than 0 return 0

-And then we can use normalizeCounter in <FavoriteValue />

-So this works but IT IS NOT GREAT  because we are calculating something which we are already calculating in another getter

          const finalCounter = state.counter * 3

-And that is why we get (getters ) as the second argument and with that we can refer to our getters and then call the finalCounter

   normalizeCounter(state , getters){

        const finalCounter = getters.finalCounter
   }


7. Running Async Code with Actions
=====================================

-Suppose in the increment mutation - we don't want to increment immediately , but wait for 2 sec and then increment 

-A good example is Sending an HTTP request and you wait for the response and only when the response is there , you want to change your state

-Or rather have code which runs asynchronously - Does not finish immediately but sometimes in the future 

-THE PROBLEM IS THAT MUTATIONS MUST BE SYNCHROUNOUS - YOU ARE NOT ALLOWED TO HAVE ANY ASYNC CODE IN YOU MUTATIONS ; YOU CAN STILL DO IT , BUT THIS IS A BAD PRACTICE

-mutations need to execute step-by-step - Not allowed to do anything that might take longer

-The reason for that is if multiple mutations execute , every mutation should work with the latest state and if another mutation was committed but did not finish yet , then this will lead to errors in your program

-INSTEAD VUEX HAS A BETTER CONCEPT IN PLACE FOR WORKING WITH ASYNC CODE  WHICH IS : ACTIONS

-AND COMPONENTS SHD TRIGGER ACTIONS FIRST WHICH THEN IN TURN TRIGGER MUTATIONS

-Because Actions can now use async code

-Therefore it is adviseable to have ACTIONS between components and mutations even if components could commit mutations themselves and that would not be a problem if we did not have async code

-It is a good practice to use actions : {} to ensure you don't put async code accidentally 

SO HOW DO WE ADD ACTIONS THEM TO OUR STORE
--------------------------------------------

- we add actions which also take an object  and methods

    actions : {
        method1(){

        },
        method2s(){

        },
    }

-And then actions again are just methods and you can use the same name here with the one used in mutations

-This action get an object as an argument - A context object - which is full of interesting things but we wil cover this in detail in the next lecture

-context has a commit method we can call for example and it does what you think; It commits a mutation - just like you would commit it inside a component

-you can pass the second argument as a payload or pass

-NB: ACTIONS UNLIKE MUTATIONS ARE ALLOWED TO RUN ASYNCHRONOUSLY - AND THEREFORE WE CAN ADD OUR TIMEOUT HERE!

    actions : {

        increment(context){
             setTimeout(function(){
                    context.commit('increment') //call it directly
                    context.commit('increment' , payload) // OR pass a payload
                    context.commit({  }) // OR pass an object
                  } , 2000)
            }
    }
-With this , the mutation is synchronous but the Action is async code which is allowed by Vuex

-AND NOW WE NEED TO CHANGE OUR COMPONENT CODE AND MAKE SURE THAT WE DON'T COMMIT INSIDE THE COMPONENT BUT WE USE THE ACTION INSTEAD

-SO INSIDE OF THE COMPONENT e.g. <ChangeCounter /> , where we previously commited , we can now dispatch() an action 
            this.$store.dispatch('increment')

-And the good thing is that the syntax of the dispatch() is as similar as the one for commit    
e.g.
        this.$store.dispatch('increase')
        OR
        this.$store.dispatch('increase' , { value : 10 })
        OR
        this.$store.dispatch({
            type : 'increase ,
            value : 10 
         })

-The action increase() will then receive the context object and the  payload added to the dispatch function as an extra argument which we can then forward to the commited mutation

e.g.
    increase(context , payload  ){
            context.commit('increase' , payload)
        },
-Of course you can change the payload or do anything you wanna do in this action


8. Understanding the Action "Context" - Revisiting context
=====================================

-we can console.log(context) and we will see a couple of interesting things

-context is a giant object with methods and properties 
        e.g 
            > commit ( type , payload , options  ) - Which we have just used
            > dispatch(  type , payload ) - can also dispatch another action from inside an action
                -This can be helpful if you are sending a HTTP request and if it succeeds , you can trigger a success action ; if error you trigger an error handling action
            > getters : {  } - Can also access getters ; incase your action needs some calculated value which you will derive from the getter
            > state : {counter: 12} - You can also tap directly to the state if the getters might not be enough - But its highly discouraged and you shd always use a mutation for that


10. ) EXAMPLE ADDING MORE STATE - Add UserAuthComponent 
===========================================

STATE:
-------
-Add isLoggedIn state and set it to false


MUTATIONS:
-----------
-Add setAuth() mutations and payload info for manipulating isLoggedIn state

   setAuth( state , payload ){
            state.isLoggedIn = payload.isAuth
        }

ACTIONS
---------------
-Add login() and logout() actions

-Add login(context) that commits the setAuth() mutation and set it to true

        login(context , payload){
            context.commit('setAuth' , payload)
        }

-Add logout(context) that commits the setAuth mutation and set it to false

        logout(context , payload){
            context.commit('setAuth' , payload)
        }

GETTERS
---------------

-Add userIsAuthenticated(state) which returns the current state i.e. false

   userIsAuthenticated(state){
            return state.isLoggedIn;
        }

-CONTINUED IN <UserAuth />..........



11. ) ORGANIZING YOUR STORE WITH MODULES
===========================================

-Means split your store into multiple modules as your application grows

-You may only have one store per app but this store can be made up of multiple modules to keep your code more manageable

-For example , one module for the counter and one module for the authentication or leave authentication in the root module and outsource the counter into an extra module

-And that is what we are going to do here

-Let's create a new object NOT A STORE JUST A REGULAR JS OBJECT

-It needs to have exactly the same features as the ones passed to the store

        const counterModule = {
            state() {
                return {
                     counter : 0,
                }
            } ,

            mutations : {
                    increment( state ) {
                    state.counter = state.counter + 2
                } ,

                increase( state , payload ){
                    state.counter = state.counter + payload.value
                },
            } ,

            actions : {
                 increment(context) {
                    setTimeout(function () {
                        context.commit('increment')
                    }, 2000)
                },

                increase(context, payload) {
                    context.commit('increase', payload)
                },
            } ,

            getters : {
                 finalCounter(state){
                    console.log(state);
                    return state.counter * 3;
                 } ,

                normalizeCounter(_ , getters){

                    const finalCounter = getters.finalCounter

                    if (finalCounter < 0 ){
                        return 0
                    } else if (finalCounter > 100 ){
                        return 100
                    }
                    return finalCounter;
                } ,
                    },
             }

-And now we can move our counter state here out of the global store into our counterModule

-Do the same for mutations : Transfer counter related mutations to counterModule

-And the same for actions : Transfer counter related actions to counterModule

-And the same for getters : Transfer counter related getters to counterModule

-And with that , our global store i.e. main store is now cleaner because it only have authentication state - and we could also move it to a separate module if we wanted to

-BUT HOW DO WE GET THE MODULE BACK TO THE STORE
----------------------------------------------------

-Well createStore({}) also has modules property which takes an object

             modules : {

                }

-And here , we now add all the modules in this object

-You give every module an identifier of your choice as the key and the value which is the module that should be merged

e.g.   
            const store = createStore({
            
                   modules : {

                    numbers : counterModule

                }
        })
-And this WORKS AS BEFORE - BECAUSE MODULES MERGED INTO THE STORE ARE ALL IN THE SAME LEVEL


12. ) UNDERSTANDING LOCAL MODULE STATE
===========================================

-From our previous lecture , modules are merged into your main store with the same level as all the other things in the store 

-You can change this behavior

-However, if we console.log(state) inside our increase() mutations , we only see counter state

-This is because it's actually treated as a local state inside the module

-Mutations/actions / getters are global , we can access them as before on the main store but the state is local to this module

-For example , we cannot access isLoggedIn() while in counterModule getters
        testAuth( state ) {
            return state.isLoggedIn
        }
-If we do this and then access this getter from the coputed : {} in <UserAuth />

    isTestAuth() {
            return this.$store.getters.testAuth
        },

-And then try to print it below the buttons , we get no output

    <button @click="login" v-if="!isAuth">Login</button>
    <button @click="logout" v-if="isAuth">Logout</button>
    <p> {{ isTestAuth }}</p>

-This is because states are only local to the module they are defined in;

-In this case isLogged state is in the main store and therefore inaccessible from the counterModule

-The same case applies to actions/muttations and getters

-But if we would need to access anything from the main store inside our counter module, then we can use getters ,rootState and rootGetters  which are context properties we saw earlier in the Understanding Action"Context"

  testAuth(state ,getters , rootState , rootGetters ) {
            return state.isLoggedIn
        },

-This is the only way we can ge access to the main state of our root store instead of just the state of this specific module in case you need it

-Probably you will not need this too often but there can be use cases where this can be useful

*/

import { createApp } from 'vue';

import { createStore } from 'vuex';

import App from './App.vue';

const counterModule = {
  
    state(){
        return {
            counter: 0,
        }
    },
    mutations : {
        increment(state) {
            state.counter = state.counter + 2
        },

        increase(state, payload) {
            console.log(state);
            state.counter = state.counter + payload.value
        },
    },
    actions : {
        increment(context) {
            setTimeout(function () {
                context.commit('increment')
            }, 2000)
        },

        increase(context, payload) {
            console.log(context);
            context.commit('increase', payload)
        },

    },
    getters : {

        testAuth(state) {
            return state.isLoggedIn
        },

        finalCounter(state) {
            return state.counter * 3;
        },

        normalizeCounter(_, getters) {

            const finalCounter = getters.finalCounter

            if (finalCounter < 0) {
                return 0
            } else if (finalCounter > 100) {
                return 100
            }
            return finalCounter;
        },
    },
}

const store = createStore({

    modules: {
        numbers: counterModule    
    },

    state(){
        return {           
            isLoggedIn : false,
        }
    } ,

    mutations : {      

        setAuth( state , payload ){
            state.isLoggedIn = payload.isAuth
        }
    } ,

    actions : {

        login(context , payload){
            context.commit('setAuth' , payload)
        },

        logout(context , payload){
            context.commit('setAuth' ,payload)
        },

    },

    getters : {
        userIsAuthenticated(state){
            return state.isLoggedIn;
        }
    }
});

const app = createApp(App);

app.use(store)

app.mount('#app');
