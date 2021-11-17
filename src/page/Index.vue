<template>
    <div class="cover relative bg-blue">
        <div class="search w-96 ml-40 pt-12">
            <img class="w-60" src="/images/logo.png" alt="" />
            <p class="text-3xl text-base font-extrabold">尋找單車,</p>
            <p class="text-3xl text-base font-extrabold">
                來場悠閒的放鬆之旅！
            </p>
            <font-awesome-icon icon="map-marker-alt" />
            <Search
                @updateCity="updateCity"
                @updateKeyword="updateKeyword"
                @search="search"
                :city="city"
                :keyword="keyword"
            />
        </div>
        <img class="fixed bottom-60" src="/images/illustration.png" />
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import Search from "../components/Search.vue";
export default {
    components: {
        Search
    },
    setup() {
        const router = useRouter();
        const data = reactive({
            city: "",
            keyword: ""
        });

        const updateCity = (city) => {
            data.city = city;
        };

        const updateKeyword = (keyword) => {
            data.keyword = keyword;
        };

        const search = () => {
            router.push({
                path: "/bike",
                query: { keyword: data.keyword, city: data.city }
            });
        };
        return {
            ...toRefs(data),
            search,
            updateCity,
            updateKeyword
        };
    }
};
</script>

<style scoped>
.cover {
    height: calc(100vh - 80px);
}
.cover:after {
    content: "";
    position: absolute;
    background-image: url("/images/Vector1.svg");
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
    background-image: url("/images/Vector.svg");
    background-repeat: no-repeat;
    background-size: contain;
    width: 400px;
    height: 300px;
    left: 0;
    bottom: 0;
}
</style>
