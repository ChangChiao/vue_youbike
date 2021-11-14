<template>
    <div>
        <Header />
    </div>
</template>


<script>
import { reactive } from "vue";
import Header from "../components/Header.vue"
export default {
    components:{
        Header
    },
    setup(){
        const address = reactive({
            list:[]
        })
        return{
            address
        }
    }
}
</script>

<style scoped>
    
</style>