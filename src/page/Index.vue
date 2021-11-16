<template>
    <div class="cover relative bg-blue">
        <div class="search w-96 ml-40 pt-12">
            <img class="w-60" src="images/logo.png" alt="">
            <p class=" text-3xl text-base font-extrabold">尋找單車,</p>
            <p class=" text-3xl text-base font-extrabold">來場悠閒的放鬆之旅！</p>
            <div class="input-box py-2 mt-10">
                <BootstrapIcon
                    icon="search"
                    size="lg"                               
                    flip-v />
                <input class="w-1/2 pl-4" placeholder="輸入關鍵字" v-model="keyword" type="text">
            </div>
            <div class="flex pt-3">
                <select class="w-1/2" name="" id="" v-model="city">
                    <option value="">縣市</option>
                    <option v-for="item in CITY_LIST" :key="item.value" :value="item.value">
                        {{ item.label }}
                    </option>
                </select>
                <button @click="search" class="ml-2 w-1/2">搜尋</button>
            </div>
        </div>
        <img class="fixed bottom-60" src="images/illustration.png" />
    </div>
</template>


<script>
import { reactive, toRefs } from "vue";
import { CITY_LIST } from "../global/constant";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue"
export default {
    components:{
        Header
    },
    setup(){
        const router = useRouter();
        const data = reactive({
            city: "",
            keyword:"",
        })
        const search = () => {
            router.push({ query: { keyword: data.keyword, city: data.city} });
        }
        return{
            ...toRefs(data),
            search,
            CITY_LIST
        }
    }
}
</script>

<style scoped>
    .cover {
        height: calc(100vh - 80px);
    }
    .cover:after {
        content: "";
        position: absolute;
        background-image: url("images/Vector1.svg");
        background-repeat: no-repeat;
        background-size: contain;
        width: 300px;
        height: 300px;
        top: 0;
        right: 0;
    }
    .cover:before {
        content: "";
        position: absolute;
        background-image: url("images/Vector.svg");
        background-repeat: no-repeat;
        background-size: contain;
        width: 400px;
        height: 300px;
        left: 0;
        bottom: 0;
    }
</style>