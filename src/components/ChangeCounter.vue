


<!-- 9. Using Mapper Helpers - Continued from <TheCounter />
=====================================

-We also have mapActions which  also exist to map actions into your component

-We just don't need to add methods which in the end just dispatch actions

-Instead , we can import mapActions() from vuex 

-We can then call it  inside our methods and not inside of computed and then again get back an object which we merge with the methods object by using the spread operator

-Also , this method takes in an array [] where we define all the actions names which we wanna have as methods in this component

-Then point to them in the event of a click listener and they will be called to Action by vuex

        <button @click="increment">Add 2 </button>
        <button @click="increase">Add 2 </button>

-You can also pass your payload as an argument as an object with a value of 10
        <button @click="increase({ value : 10 })">Add 2 </button>

-And this saves us the time to add those methods on our own

-There is an alternative way of mapping actions  - in case you are not happy with default names 

-You can pass an {} to map actions and add you then you can define the method names you want to have in your component as keys and then hold the action which should be mapped as a value

  ...mapActions({
        inc : 'increment',
        increase : 'increase'

  })

-The same alternative exists for mapGetters

...mapGetters({
        someProps : 'getterName',

  })

 -->

<template>
    <button @click="inc">Add 2 </button>
    <button @click="increase({ value : 11 })">Add 11</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {

    methods : {
        // addOne(){
            
        //     this.$store.dispatch('increment')
        // }
        ...mapActions('numbers',['increment' , 'increase'])

        //   ...mapActions({
        //       inc: 'increment',
        //       increase: 'increase'

        //   })
    }
}
</script>