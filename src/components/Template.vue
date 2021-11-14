<template>
    <div>
        <Header />
        <ul class=" text-grey-300 font-bold bg-green-500">
            <li v-for="item in address.list" :key="item.StationUID">
                {{ item.StationAddress}}
            </li>
        </ul>
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