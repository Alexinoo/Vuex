<template>
    <button @click="addOne">Add One </button>
</template>

<script>

export default {

    methods : {
        addOne(){
            
            this.$store.commit('increment')
        }
    }
}
</script>