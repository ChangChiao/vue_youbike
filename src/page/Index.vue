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
import { getAddress2, getAddress } from '../utils/api'
export default {
    components:{
        Header
    },
    setup(){
        const address = reactive({
            list:[]
        })
        const callApi = async() => {
            // const res = await getAddress2()
            const res = await getAddress({
                $top:10,
                $format:JSON,
            })
            console.log("res", res);    
            address.list = res;
        }
        callApi()
        return{
            address
        }
    }
}
</script>

<style scoped>
    
</style>