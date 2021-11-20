<template>
    <div class="cover relative bg-primary-100">
        <div class="search w-4/5 m-auto md:ml-40 pt-12 md:w-96 relative z-10">
            <img class="w-60" src="/images/logo.png" alt="" />
            <p class="text-2xl text-primary-500 font-extrabold">尋找單車,</p>
            <p class="text-2xl text-primary-500 font-extrabold pb-4">
                來場悠閒的放鬆之旅！
            </p>
            <Search
                @updateCity="updateCity"
                @updateKeyword="updateKeyword"
                @search="search"
                :city="city"
                :keyword="keyword"
            />
        </div>
        <img
            class="fixed bottom-10 md:w-2/3 left-0 right-0 mx-auto md:bottom-40"
            src="/images/illustration.png"
        />
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import Search from "../components/Search.vue";
import { CITY_LIST } from "../global/constant";
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
.cover:before {
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
.cover:after {
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
@media screen and (max-width: 768px) {
    .cover:after {
        display: none;
    }
}
</style>
