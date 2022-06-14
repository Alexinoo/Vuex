<!-- 9. Using Mapper Helpers - Utility features provided by Vuex
=====================================

-Make our life as developers easier 

-we  have this counter computed property where in the end just access finalCounter getter
  counter() {
            return this.$store.getters.finalCounter
        }
-This is not a lot of code though but we are not doing anything besides drilling to our store

-This is not horiible but incase you are not happy with that vuex has something yuou can use

-You can import mapGetters() from vuex and then use it inside the computed object instead of defining your computed property

-You can call mapGetters() and this will return an object which you can spread into your computed property object
e.g. 
        ...mapGetters()

-It takes an array as arguments and in here we can list all the getter names as strings which you want to have as computed properties in this component

e.g. 

        ...mapGetters(['finalCounter' ,'...', '...' ])

-The same alternative exists for mapGetters

...mapGetters({
        someProps : 'getterName',

  })
-->

<template>
    <h3>{{ finalCounter }}</h3>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

    computed: {

        // counter() {
        //     return this.$store.getters.finalCounter
        // }

        // ...mapGetters(['finalCounter'])

         ...mapGetters('numbers', ['finalCounter'])

    },
}


</script>