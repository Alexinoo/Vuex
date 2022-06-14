<!-- 
10. ) EXAMPLE ADDING MORE STATE
==================================

- Add computed property and add isAuth which watches for changes

-Use this.$store.getters.userIsAuthenticated to get the current state of isLoggedIn

   computed : {

        isAuth(){
            return this.$store.getters.userIsAuthenticated;
        }
    },

-Add  login() method that will be dispatched to login()  action
-We also pass isAuth property as payload and set it to true

  login(){

            this.$store.dispatch({
                type: 'login',
                isAuth : true

            })
        } ,

-Add  logout() method that will be dispatched to logout()  action
-We also pass isAuth property as payload and set it to false

  login(){

            this.$store.dispatch({
                type: 'logout',
                isAuth : false

            })
        } ,

-CONTINUED IN APP.VUE........



12. ) UNDERSTANDING LOCAL MODULE STATE
===========================================

-Added isTestAuth() computed property

        isTestAuth() {
            return this.$store.getters.testAuth
        },


-Tried to output it on the screens

        <p> {{ isTestAuth }}</p>

 -->

<template>
    <button @click="login" v-if="!isAuth">Login</button>
    <button @click="logout" v-if="isAuth">Logout</button>
    <p> {{ isTestAuth }}</p>
</template>


<script>
export default {

    computed : {

        isAuth(){
            return this.$store.getters.userIsAuthenticated;
        },

        isTestAuth() {
            return this.$store.getters.testAuth
        },
    },

    methods : {

        login(){

            this.$store.dispatch({
                type: 'login',
                isAuth : true

            })
        } ,

        logout(){
            this.$store.dispatch({
                type : 'logout' ,
                isAuth : false
            })
        } ,
    } 
}

</script>


<style></style>