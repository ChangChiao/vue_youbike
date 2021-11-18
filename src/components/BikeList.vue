<template>
    <div
        class="
            h-full
            w-96
            fixed
            px-8
            left-0
            top-0
            z-20
            box-border
            pt-24
            overflow-hidden
            bg-white
        "
    >
        <div class="rounded-xl shadow-lg overflow-hidden">
            <div class="h-8 bg-primary-500"></div>
            <div class="p-4">
                <h1 class="text-3xl font-bold mb-6">尋找單車</h1>
                <Search
                    @search="search"
                    @updateCity="updateCity"
                    @updateKeyword="updateKeyword"
                    :city="city"
                    :keyword="keyword"
                />
            </div>
        </div>
        <div class="h-2/3 overflow-y-scroll mt-8 mb-4">
            <ul class="">
                <li
                    v-for="item in singlePageList"
                    class="bg-grey-100 rounded-xl mb-3 px-2 py-4 cursor-pointer"
                    :key="item.StationUID"
                    @click="setView(item)"
                >
                    <h3 class="text-xl font-bold">
                        {{ item.StationName.Zh_tw }}
                    </h3>
                    <h4>
                        <font-awesome-icon icon="map-marker-alt" />
                        {{ item.StationAddress.Zh_tw }}
                    </h4>
                    <p class="py-2">
                        <span :class="transType(item.ServiceStatus, 'color')">{{
                            transType(item.ServiceStatus, "type")
                        }}</span>
                        <span
                            :class="
                                item.AvailableRentBikes > 0
                                    ? 'available'
                                    : 'no-available'
                            "
                            >{{
                                item.AvailableRentBikes > 0
                                    ? "尚有單車"
                                    : "已無單車"
                            }}</span
                        >
                    </p>
                    <!-- <button >查看位置</button> -->
                </li>
            </ul>
        </div>
        <pagination />
    </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
import { transType } from "../utils/common";
import { watch } from "vue";
export default {
    components: {
        Pagination,
        Search
    },
    props: {
        singlePageList: {
            type: Array,
            default: () => []
        },
        keyword: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        }
    },
    emits: ["setView", "updateKeyword", "updateCity", "search"],
    setup(props, { emit }) {
        const setView = (obj) => {
            emit("setView", obj);
        };
        const updateKeyword = (val) => {
            emit("updateKeyword", val);
        };
        const updateCity = (val) => {
            emit("updateCity", val);
        };
        const search = () => {
            emit("search");
        };

        watch("singlePageList", () => {
            console.warn("change~~", singlePageList);
        });
        return {
            setView,
            updateCity,
            updateKeyword,
            search,
            transType
        };
    }
};
</script>

<style lang="css" scoped></style>
